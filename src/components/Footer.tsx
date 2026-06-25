import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Bosphorus Bakery
        </p>

        <p className="footer-tagline">
          EST. 2003
          <span className="footer-sep" aria-hidden="true">
            &middot;
          </span>
          SF Bay Area
          <span className="footer-sep" aria-hidden="true">
            &middot;
          </span>
          Family Owned
        </p>

        <Link className="footer-contact" href="/contact">
          Contact Us
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
