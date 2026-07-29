import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <div className={styles.logo}>TheShoeTrybe</div>
          <p>Handmade footwear, cut and stitched one pair at a time.</p>
        </div>

        <div className={styles.column}>
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop?category=men">Men</Link></li>
            <li><Link to="/shop?category=women">Women</Link></li>
            <li><Link to="/shop">All shoes</Link></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Account</h4>
          <ul>
            <li><Link to="/login">Log in</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:hello@theshoetrybe.com">hello@theshoetrybe.com</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        © {year} TheShoeTrybe. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
