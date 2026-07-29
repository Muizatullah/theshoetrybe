import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/logoImage.jpeg";
import styles from "./hero.module.css";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <section className={styles.heroContainer}>
        {/* Left Side - Text Content */}
        <div className={styles.heroContent}>
          <h1>theshoetrybe</h1>
          <p className={styles.heroTagline}>The Accent of Your Outfit</p>
          <p className={styles.heroDescription}>
            Handcrafted leather footwears for both male and females. 100% handmade
          </p>
          <Link to="/products" className={styles.productBtn}>
            Shop Now
          </Link>
        </div>

        {/* Right Side - Image */}
        <div className={styles.heroImage}>
          <div className={styles.placeHolderImage}>
            <img src={heroImage} alt="TheShoeTriby shoes" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
