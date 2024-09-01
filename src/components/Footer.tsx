import Link from 'next/link';

const Footer = () => {
  return (
    <nav className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <p>&copy; 2024 Bosphorus Bakery</p>
        </div>
        <div className="footer-section">
          <Link href="/privacy">Privacy Policy</Link>
        </div>
        <div className="footer-section">
          <Link href="/terms">Terms of Use</Link>
        </div>
        <div className="footer-section">
          <Link href="/contact">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Footer;
