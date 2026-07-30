import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { sampleProducts } from "../../data";

function formatPrice(amount) {
  return `₦${amount.toLocaleString()}`;
}

function Home() {
  const featured = sampleProducts.slice(0, 3);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>TheShoeTrybe</p>
          <h1 className={styles.heroTitle}>
            The  accent <em>of your </em> Outfit.
          </h1>
          <p className={styles.heroSubtext}>
           Handcrafted leather footwear for both male and females.100% handmade
          </p>
          <Link to="/shop" className={styles.ctaButton}>
            Shop the collection
          </Link>
        </div>
        <div className={styles.heroVisual} aria-hidden="true" />
      </section>

      <section className={styles.categories}>
        <Link to="/shop?category=men" className={`${styles.categoryCard} ${styles.men}`}>
          <span className={styles.categoryLabel}>Men</span>
        </Link>
        <Link to="/shop?category=women" className={`${styles.categoryCard} ${styles.women}`}>
          <span className={styles.categoryLabel}>Women</span>
        </Link>
      </section>

      <section className={styles.featured}>
        <div className={styles.sectionHeading}>
          <h2>Featured</h2>
          <Link to="/shop">View all →</Link>
        </div>
        <div className={styles.featuredGrid}>
          {featured.map((product) => (
            <div key={product.id}>
              <div className={styles.productPlaceholder}>image</div>
              <p className={styles.productName}>{product.name}</p>
              <p className={styles.productPrice}>{formatPrice(product.price)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
