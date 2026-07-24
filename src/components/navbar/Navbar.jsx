import { useState } from "react";
import { Link, NavLink } from "react-router-dom"; // ✅ FIXED - import Link too
import styles from "./navbar.module.css";
import { navBarData } from "../../data";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../../assets/theshoetrybe.png.jpeg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ FIXED - Added missing toggle function
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

        {/* Cart & Login */}
        <div className={styles.navButton}>
          <Link to="/cart" className={styles.cartLink}>
            🛒 Cart
          </Link>
          <Link to="/login" className={styles.loginBtn}>
            Login
          </Link>
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