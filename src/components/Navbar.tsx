<<<<<<< HEAD
import React from 'react';
// import { Link } from 'react-router-dom';

const Navbar = () => {
  return ( <nav>
    <li>
      {/* <Link to={'/contact'}></Link> */}
    </li>
    Navigation
    </nav>
  )
=======
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <div className="baklava-nav-container">
          <Link href="/baklava">Baklava</Link>
        </div>
        <div className="about-nav-container">
          <Link href="/about">Our Story</Link>
        </div>
        <div className="nav-logo-button">
          <Link href="/">
            <Image
              alt="Home button rendered as the Bosphorus Bakery Logo"
              src="/bosphorus-bakery-logo.png"
              width="100"
              height="90"
            ></Image>
          </Link>
        </div>
        <div className="locations-nav-container">
          <Link href="/locations">Locations</Link>
        </div>
        <div className="contact-nav-container">
          <Link href="/contact">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
>>>>>>> origin/master
};

export default Navbar;
