import { useState } from 'react'
import { Link, NavLink } from 'react-router'
// Logo generated with ChatGPT
import logo from '../assets/logo-emblem.svg'
import './Header.css'

function Header({ links, currentLink }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="header">
      <Link to="/" className="header-logo" onClick={closeMenu}>
        <img
          src={logo}
          alt="Jacob Williams logo, back to Home"
          width="64"
          height="56"
        />
      </Link>

      <span className="header-page-name">{currentLink?.label}</span>

      <button
        type="button"
        className="header-menu-button"
        aria-expanded={isMenuOpen}
        aria-controls="header-links"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? 'Close' : 'Menu'}
      </button>

      <nav
        aria-label="Main"
        className={isMenuOpen ? 'header-nav is-open' : 'header-nav'}
      >
        <ul id="header-links" className="header-links">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === '/'}
                className="header-link"
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
