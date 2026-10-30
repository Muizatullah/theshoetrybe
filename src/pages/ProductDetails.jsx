// import { useState } from "react";
// import { Link, useNavigate, useParams } from "react-router";
// import {
// FiArrowLeft,
// FiShoppingBag,
// FiStar,
// FiCheck,
// } from "react-icons/fi";

// import products from "../data/products";
// import styles from "./ProductDetails.module.css";
// import { useCart } from "../context/CartContext";

// export default function ProductDetails() {
    
// const { id } = useParams();
// const navigate = useNavigate();

// const product = products.find(
// (item) => String(item.id) === id
// );

// const [selectedSize, setSelectedSize] = useState(
// product ? String(product.sizes[0]) : ""
// );

// const [activeImage, setActiveImage] = useState(0);

// if (!product) {
// return ( <div className={styles.notFound}> <h1>Product not found</h1> <p>This footwear may have been removed or the link is incorrect.</p> <Link to="/shop" className={styles.backButton}>
// Return to shop </Link> </div>
// );
// }

// const images = product.images || [];
// const currentImage = images[activeImage] || images[0];

// const addToCart = () => {
// const cartItem = {
// ...product,
// size: selectedSize,
// quantity: 1,
// };

// ```
// const savedCart = JSON.parse(
//   localStorage.getItem("theshoetrybe-cart") || "[]"
// );

// const existingItem = savedCart.find(
//   (item) =>
//     item.id === cartItem.id &&
//     String(item.size) === String(cartItem.size)
// );

// let updatedCart;

// if (existingItem) {
//   updatedCart = savedCart.map((item) =>
//     item.id === cartItem.id &&
//     String(item.size) === String(cartItem.size)
//       ? { ...item, quantity: item.quantity + 1 }
//       : item
//   );
// } else {
//   updatedCart = [...savedCart, cartItem];
// }

// localStorage.setItem(
//   "theshoetrybe-cart",
//   JSON.stringify(updatedCart)
// );

// navigate("/shop");
// ```

// };

// const changeImage = (direction) => {
// setActiveImage((current) =>
// (current + direction + images.length) % images.length
// );
// };

// return ( <main className={styles.page}>
// <button
// className={styles.backLink}
// onClick={() => navigate(-1)}
// > <FiArrowLeft />
// Back </button>

// ```
//   <p className={styles.breadcrumb}>
//     <Link to="/shop">Shop</Link>
//     <span>/</span>
//     <span>{product.category}</span>
//     <span>/</span>
//     <span>{product.name}</span>
//   </p>

//   <section className={styles.productLayout}>
//     <div className={styles.gallery}>
//       <div className={styles.mainImage}>
//         {currentImage ? (
//           <img
//             src={currentImage}
//             alt={product.name}
//           />
//         ) : (
//           <div className={styles.imagePlaceholder}>
//             Product image coming soon
//           </div>
//         )}

//         {images.length > 1 && (
//           <>
//             <button
//               className={`${styles.galleryArrow} ${styles.previous}`}
//               onClick={() => changeImage(-1)}
//               aria-label="Previous image"
//             >
//               ‹
//             </button>

//             <button
//               className={`${styles.galleryArrow} ${styles.next}`}
//               onClick={() => changeImage(1)}
//               aria-label="Next image"
//             >
//               ›
//             </button>

//             <span className={styles.imageCount}>
//               {activeImage + 1} / {images.length}
//             </span>
//           </>
//         )}
//       </div>

//       {images.length > 1 && (
//         <div className={styles.thumbnails}>
//           {images.map((image, index) => (
//             <button
//               key={`${product.id}-${index}`}
//               className={`${styles.thumbnail} ${
//                 activeImage === index
//                   ? styles.selectedThumbnail
//                   : ""
//               }`}
//               onClick={() => setActiveImage(index)}
//               aria-label={`View product image ${index + 1}`}
//             >
//               <img
//                 src={image}
//                 alt={`${product.name} view ${index + 1}`}
//               />
//             </button>
//           ))}
//         </div>
//       )}
//     </div>

//     <div className={styles.details}>
//       <p className={styles.eyebrow}>
//         Handmade footwear · {product.gender}
//       </p>

//       <h1 className={styles.title}>{product.name}</h1>

//       <div className={styles.rating}>
//         <FiStar fill="currentColor" />
//         <strong>{product.rating}</strong>
//         <span>Customer rating</span>
//       </div>

//       <p className={styles.price}>
//         ₦{product.price.toLocaleString("en-NG")}
//       </p>

//       <div className={styles.divider} />

//       <p className={styles.description}>
//         {product.description}
//       </p>

//       <div className={styles.productInfo}>
//         <div>
//           <span>Category</span>
//           <strong>{product.category}</strong>
//         </div>

//         <div>
//           <span>Gender</span>
//           <strong>{product.gender}</strong>
//         </div>

//         <div>
//           <span>Colour</span>
//           <strong>{product.color}</strong>
//         </div>
//       </div>

//       <div className={styles.sizeSection}>
//         <div className={styles.sizeHeading}>
//           <label>Choose your size</label>
//           <span>EU sizes</span>
//         </div>

//         <div className={styles.sizeGrid}>
//           {product.sizes.map((size) => (
//             <button
//               key={size}
//               className={`${styles.sizeButton} ${
//                 selectedSize === String(size)
//                   ? styles.selectedSize
//                   : ""
//               }`}
//               onClick={() => setSelectedSize(String(size))}
//             >
//               {size}
//               {selectedSize === String(size) && (
//                 <FiCheck size={13} />
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       <button
//         className={styles.addButton}
//         onClick={addToCart}
//         disabled={!selectedSize}
//       >
//         <FiShoppingBag size={18} />
//         Add to cart
//       </button>

//       <p className={styles.handmadeNote}>
//         Thoughtfully handmade. Designed to be worn with confidence.
//       </p>
//     </div>
//   </section>
// </main>


// );
// }




import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  FiArrowLeft,
  FiShoppingBag,
  FiStar,
  FiCheck,
} from "react-icons/fi";

import products from "../data/products";
import { useCart } from "../context/CartContext";
import styles from "./ProductDetails.module.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.length ? String(product.sizes[0]) : ""
  );
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className={styles.page}>
        <div className={styles.notFound}>
          <h1>Product not found</h1>
          <p>Sorry, we couldn't find that product.</p>
          <Link to="/shop">Back to shop</Link>
        </div>
      </main>
    );
  }

  const images = product.images?.length ? product.images : [];
  const currentImage = images[activeImage] || "";

  function changeImage(direction) {
    if (images.length < 2) return;

    setActiveImage(
      (current) => (current + direction + images.length) % images.length
    );
  }

  function handleAddToCart() {
    if (!selectedSize) {
      window.alert("Please select a size first.");
      return;
    }

    addToCart(product, selectedSize);
    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1800);
  }

  return (
    <main className={styles.page}>
      <div className={styles.topBar}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft />
          Back
        </button>

        <p className={styles.breadcrumb}>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </p>
      </div>

      <section className={styles.productLayout}>
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            {currentImage ? (
              <img src={currentImage} alt={product.name} />
            ) : (
              <div className={styles.imagePlaceholder}>
                No product image available
              </div>
            )}

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className={`${styles.imageArrow} ${styles.previous}`}
                  onClick={() => changeImage(-1)}
                  aria-label="Previous image"
                >
                  ‹
                </button>

                <button
                  type="button"
                  className={`${styles.imageArrow} ${styles.next}`}
                  onClick={() => changeImage(1)}
                  aria-label="Next image"
                >
                  ›
                </button>

                <span className={styles.imageCount}>
                  {activeImage + 1} / {images.length}
                </span>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className={styles.thumbnails}>
              {images.map((image, index) => (
                <button
                  type="button"
                  key={`${product.id}-image-${index}`}
                  className={
                    activeImage === index
                      ? `${styles.thumbnail} ${styles.activeThumbnail}`
                      : styles.thumbnail
                  }
                  onClick={() => setActiveImage(index)}
                  aria-label={`View product image ${index + 1}`}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.productInfo}>
          <p className={styles.eyebrow}>
            {product.gender || "Handcrafted"} collection
          </p>

          <h1>{product.name}</h1>

          <div className={styles.rating}>
            <FiStar />
            <span>{product.rating || "New"}</span>
            <span className={styles.ratingText}>Customer favourite</span>
          </div>

          <p className={styles.price}>
            ₦{Number(product.price).toLocaleString("en-NG")}
          </p>

          <p className={styles.description}>
            {product.description ||
              "A handcrafted design made for comfort, quality and everyday style."}
          </p>

          <div className={styles.productFacts}>
            <p>
              <span>Category</span>
              <strong>{product.category || "Footwear"}</strong>
            </p>
            <p>
              <span>Colour</span>
              <strong>{product.color || "As pictured"}</strong>
            </p>
            <p>
              <span>Made with care</span>
              <strong>Handcrafted</strong>
            </p>
          </div>

          <div className={styles.sizeSection}>
            <div className={styles.sizeHeading}>
              <h2>Select your size</h2>
              <span>{selectedSize ? `Selected: ${selectedSize}` : ""}</span>
            </div>

            <div className={styles.sizes}>
              {(product.sizes || []).map((size) => (
                <button
                  type="button"
                  key={size}
                  className={
                    String(selectedSize) === String(size)
                      ? `${styles.sizeButton} ${styles.selectedSize}`
                      : styles.sizeButton
                  }
                  onClick={() => setSelectedSize(String(size))}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={styles.addToCartButton}
            onClick={handleAddToCart}
          >
            {added ? <FiCheck /> : <FiShoppingBag />}
            {added ? "Added to bag!" : "Add to bag"}
          </button>

          <p className={styles.deliveryNote}>
            Thoughtfully made footwear, created for your everyday movement.
          </p>

          <Link to="/shop" className={styles.continueShopping}>
            Continue shopping
          </Link>
        </div>
      </section>
    </main>
  );
}