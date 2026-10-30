
// import { useState } from "react";
// import { FiShoppingBag, FiStar } from "react-icons/fi";
// import styles from "./ProductCard.module.css";

// export default function ProductCard({ product, onAddToCart }) {
//   const sizes = product.sizes || [];
//   const images = product.images || [];

//   const [size, setSize] = useState(String(sizes[0] || ""));
//   const [imageIndex, setImageIndex] = useState(0);

//   const currentImage = images[imageIndex] || images[0] || "";

//   return (
//     <article className={styles.card}>
//       {/* IMAGE */}
//       <div className={styles.imageWrap}>
//         <img
//           src={currentImage}
//           alt={product.name}
//           className={styles.image}
//           loading="lazy"
//         />

//         {product.newArrival && (
//           <span className={styles.newBadge}>New</span>
//         )}

//         {product.category && (
//           <span className={styles.category}>{product.category}</span>
//         )}

//         {/* IMAGE DOTS */}
//         {images.length > 1 && (
//           <div className={styles.imageDots}>
//             {images.map((_, index) => (
//               <button
//                 key={index}
//                 className={`${styles.dot} ${
//                   imageIndex === index ? styles.activeDot : ""
//                 }`}
//                 onClick={() => setImageIndex(index)}
//                 aria-label={`View image ${index + 1}`}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* DETAILS */}
//       <div className={styles.details}>
//         <div className={styles.topRow}>
//           <p className={styles.gender}>{product.gender}</p>

//           <div className={styles.rating}>
//             <FiStar size={13} fill="currentColor" />
//             <span>{product.rating}</span>
//           </div>
//         </div>

//         <p className={styles.color}>{product.color}</p>
//         <h3>{product.name}</h3>
//         <p className={styles.description}>{product.description}</p>
//         <p className={styles.price}>
//           ₦{product.price?.toLocaleString("en-NG")}
//         </p>

//         {/* SIZE SELECTOR */}
//         {sizes.length > 0 && (
//           <label className={styles.sizeLabel}>
//             Select size
//             <select
//               value={size}
//               onChange={(e) => setSize(e.target.value)}
//             >
//               {sizes.map((item) => (
//                 <option value={String(item)} key={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </label>
//         )}

//         {/* ADD TO CART BUTTON */}
//         <button
//           className={styles.addButton}
//           onClick={() => onAddToCart(product, size)}
//         >
//           <FiShoppingBag size={15} />
//           Add to cart
//         </button>
//       </div>
//     </article>
//   );
// }


import { useRef, useState } from "react";
import { FiShoppingBag, FiStar } from "react-icons/fi";

import styles from "./ProductCard.module.css";

export default function ProductCard({ product, onAddToCart }) {
  const [size, setSize] = useState(String(product.sizes[0]));
  const [imageIndex, setImageIndex] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const images = product.images || [];

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance =
      touchStartX.current - touchEndX.current;

    const minimumSwipe = 50;

    // Swipe left → next image
    if (distance > minimumSwipe) {
      setImageIndex((current) =>
        Math.min(current + 1, images.length - 1)
      );
    }

    // Swipe right → previous image
    if (distance < -minimumSwipe) {
      setImageIndex((current) =>
        Math.max(current - 1, 0)
      );
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const nextImage = () => {
    setImageIndex((current) =>
      Math.min(current + 1, images.length - 1)
    );
  };

  const previousImage = () => {
    setImageIndex((current) =>
      Math.max(current - 1, 0)
    );
  };

  return (
    <article className={styles.card}>

      {/* PRODUCT IMAGE GALLERY */}
      <div
        className={styles.imageWrap}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >

        <div
          className={styles.imageSlider}
          style={{
            transform: `translateX(-${imageIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              className={styles.imageSlide}
              key={index}
            >
              <img
                src={image}
                alt={`${product.name} view ${index + 1}`}
                className={styles.image}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* NEW BADGE */}
        {product.newArrival && (
          <span className={styles.newBadge}>
            New
          </span>
        )}

        {/* CATEGORY */}
        <span className={styles.category}>
          {product.category}
        </span>

        {/* DESKTOP ARROWS */}
        {images.length > 1 && (
          <>
            <button
              className={`${styles.arrow} ${styles.previous}`}
              onClick={previousImage}
              disabled={imageIndex === 0}
              aria-label="Previous image"
            >
              ‹
            </button>

            <button
              className={`${styles.arrow} ${styles.next}`}
              onClick={nextImage}
              disabled={
                imageIndex === images.length - 1
              }
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}

        {/* IMAGE COUNTER */}
        {images.length > 1 && (
          <span className={styles.imageCounter}>
            {imageIndex + 1} / {images.length}
          </span>
        )}

        {/* DOTS */}
        {images.length > 1 && (
          <div className={styles.imageDots}>
            {images.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  imageIndex === index
                    ? styles.activeDot
                    : ""
                }`}
                onClick={() =>
                  setImageIndex(index)
                }
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* PRODUCT DETAILS */}
      <div className={styles.details}>

        <div className={styles.topRow}>
          <p className={styles.gender}>
            {product.gender}
          </p>

          <div className={styles.rating}>
            <FiStar
              size={13}
              fill="currentColor"
            />

            <span>{product.rating}</span>
          </div>
        </div>

        <p className={styles.color}>
          {product.color}
        </p>

        <h3>{product.name}</h3>

        <p className={styles.description}>
          {product.description}
        </p>

        <p className={styles.price}>
          ₦{product.price.toLocaleString("en-NG")}
        </p>

        {/* SIZE */}
        <label className={styles.sizeLabel}>
          Select size

          <select
            value={size}
            onChange={(event) =>
              setSize(event.target.value)
            }
          >
            {product.sizes.map((item) => (
              <option
                value={String(item)}
                key={item}
              >
                {item}
              </option>
            ))}
          </select>
        </label>

        {/* ADD TO CART */}
        <button
          className={styles.addButton}
          onClick={() =>
            onAddToCart(product, size)
          }
        >
          <FiShoppingBag size={15} />
          Add to cart
        </button>
      </div>
    </article>
  );
}
