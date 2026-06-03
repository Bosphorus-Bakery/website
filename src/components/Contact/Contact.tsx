import { ContactForm } from '@/components';
import { contactStyles } from '@/styles';

const ContactPage = () => {
  return (
    <div className={contactStyles['page-container']}>
      <h1 className={contactStyles['heading-1']}>Contact Us</h1>
      <p className={contactStyles['subheading']}>
        Send us a message and we'll get back to you shortly
      </p>
      <div className={contactStyles['content-container']}>
        <div className={contactStyles['form-panel']}>
          <ContactForm />
        </div>

        <div className={contactStyles['store-details-container']}>
          <div className={contactStyles['store-detail-row']}>
            <span className={contactStyles['detail-label']}>Address</span>
            <div className={contactStyles['detail-value']}>
              <p>1301 Maurice Avenue Rohnert Park, CA 94928</p>
            </div>
          </div>

          <div className={contactStyles['store-detail-row']}>
            <span className={contactStyles['detail-label']}>Hours</span>
            <div className={contactStyles['detail-value']}>
              <p>Mon - Thurs 9:00am - 2:00pm</p>
            </div>
          </div>

          <div className={contactStyles['store-detail-row']}>
            <span className={contactStyles['detail-label']}>Phone</span>
            <div className={contactStyles['detail-value']}>
              <a href="tel:4154083037">(415) 408-3037</a>
            </div>
          </div>

          <div className={contactStyles['store-detail-row']}>
            <span className={contactStyles['detail-label']}>Email</span>
            <div className={contactStyles['detail-value']}>
              <a href="mailto:owner@bosphorusbakery.com">
                owner@bosphorusbakery.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
