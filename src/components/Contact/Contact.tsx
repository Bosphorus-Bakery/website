import { ContactForm } from '@/components';
import { contactStyles } from '@/styles';
import {
  SiYelp,
  SiFacebook,
  SiInstagram,
} from '@icons-pack/react-simple-icons';
const ContactPage = () => {
  return (
    <div className={contactStyles.pageContainer}>
      <h1 className={contactStyles.heading1}>Contact Us</h1>
      <p className={contactStyles.subheading}>
        Fill out the form below to get in touch.
        <br />
        Prefer to order by phone? Call us at{' '}
        <a href="tel:4154083037" style={{ whiteSpace: 'nowrap' }}>(415) 408-3037</a>.
      </p>
      <div className={contactStyles.contentContainer}>
        <div className={contactStyles.formPanel}>
          <ContactForm />
        </div>

        <div className={contactStyles.storeDetailsContainer}>
          <div className={contactStyles.storeDetailRow}>
            <span className={contactStyles.detailLabel}>Address</span>
            <div className={contactStyles.detailValue}>
              <p>1301 Maurice Avenue<br />Rohnert Park, CA 94928</p>
            </div>
          </div>

          <div className={contactStyles.storeDetailRow}>
            <span className={contactStyles.detailLabel}>Hours</span>
            <div className={contactStyles.detailValue}>
              <p>Mon - Thurs 9:00am - 2:00pm</p>
            </div>
          </div>

          <div className={contactStyles.storeDetailRow}>
            <span className={contactStyles.detailLabel}>Phone</span>
            <div className={contactStyles.detailValue}>
              <a href="tel:4154083037">(415) 408-3037</a>
            </div>
          </div>

          <div className={contactStyles.storeDetailRow}>
            <span className={contactStyles.detailLabel}>Email</span>
            <div className={contactStyles.detailValue}>
              <a href="mailto:owner@bosphorusbakery.com">
                owner@bosphorusbakery.com
              </a>
            </div>
          </div>

          <div className={contactStyles.storeDetailRow}>
            <span className={contactStyles.detailLabel}>Socials</span>
            <ul className={contactStyles.socialsBar}>
              <li>
                <a
                  href="https://www.yelp.com/biz/bosphorus-baklava-novato"
                  className={contactStyles.socialLink}
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
                  className={contactStyles.socialLink}
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
                  className={contactStyles.socialLink}
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiInstagram size={24} color="#FF0069" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
