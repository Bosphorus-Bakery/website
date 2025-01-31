import { ContactForm } from '@/components';
import { contactStyles, formStyles } from '@/styles';

const ContactPage = () => {
  return (
    <div className={contactStyles["contact-container"]}>
      <h1 className={contactStyles["heading-1"]}>Contact Us</h1>
      <p className={contactStyles["subheading"]}>Please fill out the form below to reach out to us</p>
      <div>
        <ContactForm />
        <div className="contact-store-details">
          <div id="store-address">
            <p>1301 Maurice Avenue</p>
            <p>Rohnert Park, CA 94928</p>
          </div>
          <div id="store-hours">
            <p>OPEN</p>
            <p>Monday to Thursday</p>
          </div>
          <div id="store-phone-email">
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
