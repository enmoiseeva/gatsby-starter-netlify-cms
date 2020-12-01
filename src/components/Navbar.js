import React, { useState, useEffect } from "react";
import { Link } from "gatsby";

export default function Navbar() {
  const [active, setActive] = useState(false);
  const [navBarActiveClass, setNavBarActiveClass] = useState("");

  const toggleHamburger = () => {
    const newActive = !active;
    setActive(!active);
    setNavBarActiveClass(newActive ? "is-active" : "");
  };

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo">
            <span className="navbar-logo">TATIANA MOISEEVA LAB</span>
          </Link>
          {/* Hamburger menu */}
          <div
            className={`navbar-burger burger ${navBarActiveClass}`}
            data-target="navMenu"
            onClick={() => toggleHamburger()}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div id="navMenu" className={`navbar-menu ${navBarActiveClass}`}>
          <div className="navbar-start has-text-centered">
            <Link className="navbar-item" to="/" activeClassName="active">
              Home
            </Link>
            <Link
              className="navbar-item"
              to="/research"
              activeClassName="active"
            >
              Research
            </Link>
            <Link className="navbar-item" to="/people" activeClassName="active">
              People
            </Link>
            <Link
              className="navbar-item"
              to="/publications"
              activeClassName="active"
            >
              Publications
            </Link>
            <Link
              className="navbar-item"
              to="/contacts"
              activeClassName="active"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
