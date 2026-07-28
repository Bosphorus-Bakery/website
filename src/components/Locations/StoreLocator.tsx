'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { storeLocations } from '@/lib/constants';
import type { StoreLocation } from '@/lib/constants';
import { locationStyles } from '@/styles';

interface StoreLocatorProps {
  apiKey: string;
}

type LatLng = StoreLocation['position'];

const BOUNDS_PADDING_DEG = 0.05;

const mapBounds = {
  north:
    Math.max(...storeLocations.map((l) => l.position.lat)) +
    BOUNDS_PADDING_DEG,
  south:
    Math.min(...storeLocations.map((l) => l.position.lat)) -
    BOUNDS_PADDING_DEG,
  east:
    Math.max(...storeLocations.map((l) => l.position.lng)) +
    BOUNDS_PADDING_DEG,
  west:
    Math.min(...storeLocations.map((l) => l.position.lng)) -
    BOUNDS_PADDING_DEG,
};

// Zoom for a clicked store: block/plaza level — enough to see the shopping
// center and adjacent streets without diving to parking-lot detail.
const SELECTED_ZOOM = 16;

// Fade-out duration before the camera jump; keep in sync with the
// .locatorMap opacity transition in Locations.module.css.
const MAP_FADE_MS = 220;
const ZIP_PATTERN = /^\d{5}$/;

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

const milesBetween = (a: LatLng, b: LatLng) => {
  const earthRadiusMiles = 3958.8;
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(a.lat)) *
      Math.cos(toRadians(b.lat)) *
      Math.sin(dLng / 2) ** 2;
  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(h));
};

const directionsUrl = (location: StoreLocation) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    location.address,
  )}`;

// Geometrically centered star for the flagship badge — a text "★" comes from
// whatever fallback font has the glyph, which sits off-center per platform.
const StarIcon = () => (
  <svg
    className={locationStyles.badgeStar}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const StoreLocatorContent = () => {
  const map = useMap();
  const geocodingLib = useMapsLibrary('geocoding');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zipInput, setZipInput] = useState('');
  const [searchOrigin, setSearchOrigin] = useState<LatLng | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  // Start with both edges "reached" so no fade shows until first measure.
  const [scrollEdges, setScrollEdges] = useState({
    atTop: true,
    atBottom: true,
  });

  const updateScrollEdges = () => {
    const list = listRef.current;
    if (!list) return;
    const atTop = list.scrollTop <= 1;
    const atBottom =
      list.scrollTop + list.clientHeight >= list.scrollHeight - 1;
    setScrollEdges((prev) =>
      prev.atTop === atTop && prev.atBottom === atBottom
        ? prev
        : { atTop, atBottom },
    );
  };

  useEffect(() => {
    updateScrollEdges();
    window.addEventListener('resize', updateScrollEdges);
    return () => window.removeEventListener('resize', updateScrollEdges);
  }, []);

  // The bakery is the flagship: always listed first with a star pin, never
  // sorted in with the retailers. Retailers share one ordering between cards
  // and pins: closest-first from the searched ZIP, or the hand-ordered
  // default otherwise.
  const [bakery, ...retailers] = storeLocations;
  const sortedRetailers = searchOrigin
    ? [...retailers].sort(
        (a, b) =>
          milesBetween(searchOrigin, a.position) -
          milesBetween(searchOrigin, b.position),
      )
    : retailers;
  const displayLocations = [
    { location: bakery, isFlagship: true, badge: '★' },
    ...sortedRetailers.map((location, i) => ({
      location,
      isFlagship: false,
      badge: `${i + 1}`,
    })),
  ];
  const distanceOrigin = searchOrigin ?? bakery.position;

  // Camera moves are disorienting when animated as travel; instead fade the
  // map out, jump the camera while hidden, and fade back in.
  const [isMapFading, setIsMapFading] = useState(false);
  const fadeTimeout = useRef<number | null>(null);

  const cancelFade = () => {
    if (fadeTimeout.current !== null) {
      clearTimeout(fadeTimeout.current);
      fadeTimeout.current = null;
    }
  };

  useEffect(() => cancelFade, []);

  const jumpWithFade = (target: LatLng, zoom: number) => {
    if (!map) return;
    cancelFade();
    setIsMapFading(true);
    fadeTimeout.current = window.setTimeout(() => {
      map.moveCamera({ center: target, zoom });
      setIsMapFading(false);
      fadeTimeout.current = null;
    }, MAP_FADE_MS);
  };

  const selectStore = (location: StoreLocation, scrollToCard: boolean) => {
    setSelectedId(location.id);
    jumpWithFade(location.position, SELECTED_ZOOM);
    if (scrollToCard) {
      document
        .getElementById(`store-card-${location.id}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const fitAllPins = (extraPoint?: LatLng) => {
    if (!map) return;
    const lats = storeLocations.map((l) => l.position.lat);
    const lngs = storeLocations.map((l) => l.position.lng);
    if (extraPoint) {
      lats.push(extraPoint.lat);
      lngs.push(extraPoint.lng);
    }
    map.fitBounds(
      {
        north: Math.max(...lats),
        south: Math.min(...lats),
        east: Math.max(...lngs),
        west: Math.min(...lngs),
      },
      48,
    );
  };

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    if (!ZIP_PATTERN.test(zipInput)) {
      setSearchError('Please enter a 5-digit ZIP code.');
      return;
    }
    if (!geocodingLib) return;
    setIsSearching(true);
    setSearchError(null);
    try {
      const { results } = await new geocodingLib.Geocoder().geocode({
        componentRestrictions: { country: 'US', postalCode: zipInput },
      });
      const point = results[0].geometry.location;
      const origin = { lat: point.lat(), lng: point.lng() };
      setSearchOrigin(origin);
      setSelectedId(null);
      listRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      fitAllPins(origin);
    } catch {
      setSearchError(
        "We couldn't find that ZIP code — double-check it and try again.",
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleUseMyLocation = async () => {
    if (!('geolocation' in navigator)) {
      setSearchError(
        "Your browser doesn't support location — enter a ZIP code instead.",
      );
      return;
    }
    setIsLocating(true);
    setSearchError(null);
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
            maximumAge: 300000,
          }),
      );
      const origin = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setSearchOrigin(origin);
      setSelectedId(null);
      listRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      fitAllPins(origin);
      // Best-effort: show their ZIP in the input (one Geocoding call).
      // Sorting already happened off the raw coordinates, so a failure
      // here is cosmetic and stays silent.
      if (geocodingLib) {
        try {
          const { results } = await new geocodingLib.Geocoder().geocode({
            location: origin,
          });
          const zip = results
            .flatMap((result) => result.address_components)
            .find((component) => component.types.includes('postal_code'))
            ?.short_name;
          if (zip) setZipInput(zip);
        } catch {
          // ignore
        }
      }
    } catch (error) {
      setSearchError(
        error instanceof GeolocationPositionError &&
          error.code === error.PERMISSION_DENIED
          ? 'Location access was denied — you can enter a ZIP code instead.'
          : "We couldn't get your location — try entering a ZIP code.",
      );
    } finally {
      setIsLocating(false);
    }
  };

  const clearSearch = () => {
    setZipInput('');
    setSearchOrigin(null);
    setSearchError(null);
    setSelectedId(null);
    listRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    fitAllPins();
  };

  return (
    <>
      <form
        className={locationStyles.searchBar}
        onSubmit={handleSearch}
        noValidate
      >
        <input
          className={locationStyles.searchInput}
          type="text"
          inputMode="numeric"
          maxLength={5}
          placeholder="Enter ZIP code"
          aria-label="Search stores by ZIP code"
          value={zipInput}
          onChange={(e) => setZipInput(e.target.value.replace(/\D/g, ''))}
        />
        <button
          type="submit"
          className={locationStyles.searchSubmit}
          disabled={isSearching || !geocodingLib}
        >
          {isSearching ? 'Searching…' : 'Find Stores'}
        </button>
        <button
          type="button"
          className={locationStyles.searchLocate}
          onClick={handleUseMyLocation}
          disabled={isLocating}
        >
          {isLocating ? 'Locating…' : 'Use My Location'}
        </button>
        {searchOrigin && (
          <button
            type="button"
            className={locationStyles.searchClear}
            onClick={clearSearch}
          >
            Clear
          </button>
        )}
      </form>
      {searchError && (
        <p className={locationStyles.searchError} role="alert">
          {searchError}
        </p>
      )}

      <div className={locationStyles.locatorBlock}>
        <div
          className={`${locationStyles.locatorListWrap} ${
            scrollEdges.atTop ? '' : locationStyles.fadeTop
          } ${scrollEdges.atBottom ? '' : locationStyles.fadeBottom}`}
        >
          <div
            ref={listRef}
            className={locationStyles.locatorList}
            onScroll={updateScrollEdges}
          >
            {displayLocations.map(({ location, isFlagship, badge }) => {
              const isSelected = location.id === selectedId;
              const showDistance = searchOrigin !== null || !isFlagship;
              return (
                <div
                  key={location.id}
                  id={`store-card-${location.id}`}
                  className={`${locationStyles.storeCard} ${
                    isFlagship ? locationStyles.storeCardFlagship : ''
                  } ${isSelected ? locationStyles.storeCardSelected : ''}`}
                  onClick={() => selectStore(location, false)}
                >
                  {isFlagship && (
                    <p className={locationStyles.flagshipTag}>Our Bakery</p>
                  )}
                  <div className={locationStyles.storeCardHeader}>
                    <span className={locationStyles.storeCardBadge}>
                      {isFlagship ? <StarIcon /> : badge}
                    </span>
                    <button
                      type="button"
                      className={locationStyles.storeCardName}
                      onClick={() => selectStore(location, false)}
                    >
                      {location.name}
                      {showDistance && (
                        <span className={locationStyles.storeCardDistance}>
                          (
                          {Math.round(
                            milesBetween(distanceOrigin, location.position),
                          )}{' '}
                          mi)
                        </span>
                      )}
                    </button>
                  </div>
                  <p className={locationStyles.storeCardAddress}>
                    {location.address}
                  </p>
                  <div className={locationStyles.storeCardLinks}>
                    {location.phone && (
                      <a
                        href={`tel:${location.phone.replace(/\D/g, '')}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {location.phone}
                      </a>
                    )}
                    <a
                      href={directionsUrl(location)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={locationStyles.locatorMapWrap}>
          <Map
            className={`${locationStyles.locatorMap} ${
              isMapFading ? locationStyles.locatorMapFaded : ''
            }`}
            defaultBounds={mapBounds}
            // AdvancedMarker needs a Map ID; DEMO_MAP_ID is Google's dev
            // placeholder — swap in a real one from the Cloud console to
            // customize map styling.
            mapId="DEMO_MAP_ID"
            gestureHandling="cooperative"
          >
            {displayLocations.map(({ location, isFlagship, badge }) => {
              const isSelected = location.id === selectedId;
              const isFilled = isFlagship || isSelected;
              return (
                <AdvancedMarker
                  key={location.id}
                  position={location.position}
                  title={location.name}
                  zIndex={isSelected ? 10 : isFlagship ? 5 : 1}
                  onClick={() => selectStore(location, true)}
                >
                  <Pin
                    background={isFilled ? '#BA7517' : '#fff8e8'}
                    borderColor="#a87010"
                    glyphColor={isFilled ? '#fff8e8' : '#BA7517'}
                    glyph={badge}
                    scale={
                      isFlagship
                        ? isSelected
                          ? 1.5
                          : 1.35
                        : isSelected
                          ? 1.25
                          : 1
                    }
                  />
                </AdvancedMarker>
              );
            })}
            {searchOrigin && (
              <AdvancedMarker
                position={searchOrigin}
                title="Searched ZIP code"
                zIndex={20}
              >
                <Pin
                  background="#7da040"
                  borderColor="#5c7a2e"
                  glyphColor="#fff8e8"
                />
              </AdvancedMarker>
            )}
          </Map>
        </div>
      </div>
    </>
  );
};

const StoreLocator = ({ apiKey }: StoreLocatorProps) => {
  return (
    <APIProvider apiKey={apiKey}>
      <StoreLocatorContent />
    </APIProvider>
  );
};

export default StoreLocator;
