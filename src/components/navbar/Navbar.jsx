import { useState } from "react";
import { Link, NavLink } from "react-router-dom"; 
import styles from "./navbar.module.css";
import { navBarData } from "../../data";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../../assets/theshoetrybe.png.jpeg";

const cartCount = 0;
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        {/* Logo */}
        <div className={styles.logo}>
          <img src={Logo} alt="theshoetrybe" className={styles.logoImage} />
        </div>

        {/* Nav Links */}
        <ul className={`${styles.navLinks} ${isOpen ? styles.showMenu : ""}`}>
          {navBarData.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.pathUrl}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navLink
                }
                onClick={handleLinkClick}
              >
                {item.pathName}
              </NavLink>
            </li>
          ))}
        </ul>

        
        <div className={styles.actions}>
                <NavLink to="/login" className={styles.iconButton} aria-label="Log in">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
                  </svg>
                </NavLink>
        
                <NavLink to="/cart" className={styles.iconButton} aria-label={`Cart, ${cartCount} items`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 8h12l-1 12H7L6 8z" />
                    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
                  </svg>
                  {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
                </NavLink>
              </div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.menuToggle} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;