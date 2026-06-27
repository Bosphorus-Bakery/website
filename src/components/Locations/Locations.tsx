import Image from 'next/image';
import {
  SiYelp,
  SiFacebook,
  SiInstagram,
} from '@icons-pack/react-simple-icons';
import { locationStyles } from '@/styles';

const Locations = () => {
  return (
    <div className={locationStyles.page}>
      <div className={locationStyles.banner}>
        <p className={locationStyles.bannerEyebrow}>Where to find us</p>
        <h1 className={locationStyles.bannerTitle}>Our Store</h1>
        <p className={locationStyles.bannerTagline}>
          SStop by our bakery in Rohnert Park, CA, just off campus from Sonoma
          State, and grab your order fresh.
        </p>
      </div>

      <div className={locationStyles.inner}>
        <div className={locationStyles.storeBlock}>
          <div className={locationStyles.storeImageWrap}>
            <Image
              src="/store-front.jpg"
              alt="Bosphorus Bakery storefront"
              fill
              className={locationStyles.storeImage}
            />
          </div>

          <div>
            <div className={locationStyles.storeDetailRow}>
              <span className={locationStyles.detailLabel}>Address</span>
              <div className={locationStyles.detailValue}>
                <p>
                  1301 Maurice Avenue
                  <br />
                  Rohnert Park, CA 94928
                </p>
              </div>
            </div>

            <div className={locationStyles.storeDetailRow}>
              <span className={locationStyles.detailLabel}>Hours</span>
              <div className={locationStyles.detailValue}>
                <p>Mon – Thurs 9:00am – 2:00pm</p>
              </div>
            </div>

            <div className={locationStyles.storeDetailRow}>
              <span className={locationStyles.detailLabel}>Phone</span>
              <div className={locationStyles.detailValue}>
                <a href="tel:4154083037">(415) 408-3037</a>
              </div>
            </div>

            <div className={locationStyles.storeDetailRow}>
              <span className={locationStyles.detailLabel}>Email</span>
              <div className={locationStyles.detailValue}>
                <a href="mailto:owner@bosphorusbakery.com">
                  owner@bosphorusbakery.com
                </a>
              </div>
            </div>

            <div className={locationStyles.storeDetailRow}>
              <span className={locationStyles.detailLabel}>Socials</span>
              <ul className={locationStyles.socialsBar}>
                <li>
                  <a
                    href="https://www.yelp.com/biz/bosphorus-baklava-novato"
                    className={locationStyles.socialLink}
                    aria-label="Yelp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiYelp size={24} color="#FF1A1A" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/BosphorusBaklava"
                    className={locationStyles.socialLink}
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiFacebook size={24} color="#0866FF" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/bosphorus_baklava"
                    className={locationStyles.socialLink}
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiInstagram size={24} color="#FF0069" />
                  </a>
                </li>
              </ul>
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=1301+Maurice+Ave+Rohnert+Park+CA+94928"
              className={locationStyles.directionsBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
