
import { NavLink, Outlet } from "react-router";
import {
  FiGrid,
  FiUser,
  FiSettings,
  FiMessageCircle,
  FiShoppingBag,
  FiHeadphones,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState } from "react";
import styles from "./CustomerLayout.module.css";

const navigation = [
  { label: "Dashboard", path: "/shop", Icon: FiGrid, end: true },
  { label: "My Profile", path: "/shop/profile", Icon: FiUser },
  { label: "My Orders", path: "/shop/orders", Icon: FiShoppingBag },
  { label: "Messages", path: "/shop/messages", Icon: FiMessageCircle },
  { label: "Settings", path: "/shop/settings", Icon: FiSettings },
  { label: "Support", path: "/shop/support", Icon: FiHeadphones },
];

export default function CustomerLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.app}>
      {menuOpen && (
        <button
          className={styles.overlay}
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={`${styles.sidebar} ${
          menuOpen ? styles.sidebarOpen : ""
        }`}
      >
        <NavLink
          to="/shop"
          className={styles.logo}
          onClick={() => setMenuOpen(false)}
        >
          TheShoe<span>Trybe.</span>
        </NavLink>

        <p className={styles.navLabel}>SHOP MENU</p>

        <nav className={styles.navigation}>
          {navigation.map(({ label, path, Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `${styles.navLink} ${
                  isActive ? styles.active : ""
                }`
              }
            >
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarBottom}>
          <p>the accents of your outfits.</p>
          <button
            className={styles.logout}
            onClick={() =>
              alert("We'll connect logout to authentication later.")
            }
          >
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.mobileHeader}>
          <button
            className={styles.menuButton}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={23} /> : <FiMenu size={23} />}
          </button>

          <NavLink to="/shop" className={styles.mobileLogo}>
            TheShoe<span>Trybe.</span>
          </NavLink>

          <NavLink to="/shop/cart" aria-label="Shopping cart">
            <FiShoppingBag size={21} />
          </NavLink>
        </header>

        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}