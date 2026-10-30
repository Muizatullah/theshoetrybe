
import { NavLink, Outlet } from "react-router";
import {
  FiGrid,
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import styles from "./AdminLayout.module.css";

const adminLinks = [
  { label: "Overview", path: "/admin", Icon: FiGrid, end: true },
  { label: "Products", path: "/admin/products", Icon: FiPackage },
  { label: "Orders", path: "/admin/orders", Icon: FiShoppingCart },
  { label: "Customers", path: "/admin/customers", Icon: FiUsers },
  { label: "Analytics", path: "/admin/analytics", Icon: FiBarChart2 },
  { label: "Settings", path: "/admin/settings", Icon: FiSettings },
];

export default function AdminLayout() {
  return (
    <div className={styles.adminApp}>
      <aside className={styles.sidebar}>
        <NavLink to="/admin" className={styles.logo}>
          TheShoe<span>Trybe.</span>
          <small>STORE MANAGEMENT</small>
        </NavLink>

        <p className={styles.label}>WORKSPACE</p>

        <nav className={styles.navigation}>
          {adminLinks.map(({ label, path, Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.bottom}>
          <NavLink to="/shop" className={styles.storeLink}>
            <FiShoppingCart size={18} />
            View customer store
          </NavLink>

          <button
            className={styles.logout}
            onClick={() =>
              alert("We'll connect admin logout to authentication later.")
            }
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <p>THESHOETRYBE / ADMIN</p>
            <span>Store management workspace</span>
          </div>

          <div className={styles.adminBadge}>
            <span>TB</span>
            <div>
              <strong>Store Admin</strong>
              <small>Administrator</small>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};