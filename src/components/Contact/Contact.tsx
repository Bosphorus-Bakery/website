import { ContactForm } from '@/components';
import { contactStyles } from '@/styles';

const ContactPage = () => {
  return (
    <div className={contactStyles["page-container"]}>
      <h1 className={contactStyles["heading-1"]}>Contact Us</h1>
      <p className={contactStyles["subheading"]}>Please fill out the form below to reach out to us</p>
      <div>
        <ContactForm />
        <div className={contactStyles['store-details-container']}>
          <div className={contactStyles['store-detail']} id="store-address">
            <p>1301 Maurice Avenue<br/>Rohnert Park, CA 94928</p>
          </div>
          <div className={contactStyles['store-detail']} id="store-hours">
            <p>Monday to Thursday</p>
          </div>
          <div className={contactStyles['store-detail']} id="store-phone-email">
            <p>(415)408-3037</p>
            <p>owner@bosphorusbakery.com</p>
          </div> 
          <img
          src="/public/placeholder-image-baklava.jpg"
          alt="Baklava"
        />
        </div>

      </div>

    </div>
  )
}

export default ContactPage
