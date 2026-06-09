'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'Our Story' },
  { href: '/locations', label: 'Locations' },
  { href: '/contact', label: 'Contact Us' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const renderLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      key={href}
      href={href}
      className={pathname === href ? 'nav-link-active' : undefined}
      aria-current={pathname === href ? 'page' : undefined}
    >
      {label}
    </Link>
  );

  return (
    <nav
      className={`nav-bar${scrolled || menuOpen ? ' nav-bar-scrolled' : ''}`}
      aria-label="Main navigation"
    >
      <div className="nav-container">
        <div className="nav-links nav-links-left">
          {navLinks.slice(0, 2).map(renderLink)}
        </div>

        <div className="nav-logo-button">
          <Link href="/" aria-label="Bosphorus Bakery home">
            <Image
              alt="Bosphorus Bakery logo"
              src="/bosphorus-bakery-logo.png"
              width="130"
              height="117"
              priority
            />
          </Link>
        </div>

        <div className="nav-links nav-links-right">
          {navLinks.slice(2).map(renderLink)}
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`nav-toggle-icon${
              menuOpen ? ' nav-toggle-icon-open' : ''
            }`}
          />
        </button>
      </div>

      <div
        className={`nav-mobile-menu${menuOpen ? ' nav-mobile-menu-open' : ''}`}
      >
        {navLinks.map(renderLink)}
      </div>
    </nav>
  );
};

export default Navbar;
