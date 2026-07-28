export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  phone?: string;
  position: { lat: number; lng: number };
}

/**
 * Pins for the Locations-page store locator, in display order (pin #1 first),
 * bakery first then retailers by distance from it.
 *
 * TODO: the retailer entries are placeholders — one plausible nearby branch
 * per chain. Confirm with the owner which branches actually stock our
 * baklava, then fix addresses and re-geocode (nominatim.openstreetmap.org).
 */
export const storeLocations: StoreLocation[] = [
  {
    id: 'bosphorus-bakery',
    name: 'Bosphorus Bakery',
    address: '1301 Maurice Avenue, Rohnert Park, CA 94928',
    phone: '(415) 408-3037',
    position: { lat: 38.33498, lng: -122.68562 },
  },
  {
    id: 'olivers-market-cotati',
    name: "Oliver's Market",
    address: '546 E Cotati Ave, Cotati, CA 94931',
    position: { lat: 38.32853, lng: -122.6994 },
  },
  {
    id: 'whole-foods-petaluma',
    name: 'Whole Foods Market',
    address: '621 E Washington St, Petaluma, CA 94952',
    position: { lat: 38.24129, lng: -122.63464 },
  },
  {
    id: 'andronicos-san-anselmo',
    name: "Andronico's Community Markets",
    address: '100 Center Blvd, San Anselmo, CA 94960',
    position: { lat: 37.97663, lng: -122.56263 },
  },
  {
    id: 'woodlands-market-kentfield',
    name: 'Woodlands Market',
    address: '735 College Ave, Kentfield, CA 94904',
    position: { lat: 37.95242, lng: -122.54972 },
  },
  {
    id: 'mollie-stones-greenbrae',
    name: "Mollie Stone's Markets",
    address: '270 Bon Air Center, Greenbrae, CA 94904',
    position: { lat: 37.9461, lng: -122.52395 },
  },
  {
    id: 'rainbow-grocery-sf',
    name: 'Rainbow Grocery',
    address: '1745 Folsom St, San Francisco, CA 94103',
    position: { lat: 37.76914, lng: -122.41508 },
  },
  {
    id: 'berkeley-bowl',
    name: 'Berkeley Bowl',
    address: '2020 Oregon St, Berkeley, CA 94703',
    position: { lat: 37.85744, lng: -122.26893 },
  },
  {
    id: 'new-leaf-half-moon-bay',
    name: 'New Leaf Community Markets',
    address: '150 San Mateo Rd, Half Moon Bay, CA 94019',
    position: { lat: 37.46898, lng: -122.43214 },
  },
];