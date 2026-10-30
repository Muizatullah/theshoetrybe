

// import { useMemo, useState } from "react";
// import { FiArrowUpRight, FiSearch, FiSliders } from "react-icons/fi";
// import slide8 from "../assets/slide8.jpeg"

// import products from "../data/products";
// import ProductCard from "../components/ProductCard";
// import CartPanel from "../components/CartPanel";
// import styles from "./CustomerDashboard.module.css";

// const categories = ["All", "Male Slides", "Female Slides", " Male Sandals", "Female Sandals","Unisex", " Male Shoes", "Heels", " Male Briken-Stock","Female Briken-stock", "Couples Slides"];

// export default function CustomerDashboard() {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [cart, setCart] = useState([]);

//   const filteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       const matchesCategory =
//         category === "All" || product.category === category;

//       const matchesSearch =
//         `${product.name} ${product.category} ${product.color}`
//           .toLowerCase()
//           .includes(search.toLowerCase().trim());

//       return matchesCategory && matchesSearch;
//     });
//   }, [search, category]);

//   function addToCart(product, size) {
//     setCart((currentCart) => {
//       const existing = currentCart.find(
//         (item) => item.id === product.id && item.size === size
//       );

//       if (existing) {
//         return currentCart.map((item) =>
//           item.id === product.id && item.size === size
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }

//       return [
//         ...currentCart,
//         { ...product, size, quantity: 1 },
//       ];
//     });
//   }

//   function changeQuantity(id, size, amount) {
//     setCart((currentCart) =>
//       currentCart
//         .map((item) =>
//           item.id === id && item.size === size
//             ? { ...item, quantity: item.quantity + amount }
//             : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   }

//   function removeFromCart(id, size) {
//     setCart((currentCart) =>
//       currentCart.filter(
//         (item) => !(item.id === id && item.size === size)
//       )
//     );
//   }

//   const cartCount = cart.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );

//   return (
//     <div className={styles.page}>
//       <div className={styles.shopContent}>
//         <header className={styles.header}>
//           <div>
//             <p className={styles.eyebrow}>WELCOME TO THESHOETRYBE</p>
//             <h1>Step into your <span>style.</span></h1>
//             <p className={styles.subtitle}>
//               Discover footwear made for your everyday story.
//             </p>
//           </div>

//           <label className={styles.search}>
//             <FiSearch size={18} />
//             <input
//               value={search}
//               onChange={(event) => setSearch(event.target.value)}
//               placeholder="Search shoes and slides..."
//               aria-label="Search footwear"
//             />
//           </label>
//         </header>

//         <section className={styles.heroGrid}>
//           <article className={styles.welcomeCard}>
//             <p className={styles.tag}>YOUR STYLE, YOUR RULES</p>
//             <h2>Find your next favourite pair.</h2>
//             <p>
//               From effortless slides to timeless shoes,
//               find your perfect fit.
//             </p>
//             <a href="#products" className={styles.primaryButton}>
//               Shop the collection <FiArrowUpRight />
//             </a>
//           </article>

//           <article className={styles.saleCard}>
//             <div className={styles.saleCopy}>
//               <p className={styles.tag}>THE LATEST EDIT</p>
//               <h2>Every step.</h2>
//               <h3>Your statement.</h3>
//               <p>Fresh styles for every occasion.</p>
//               <a href="#products" className={styles.saleButton}>
//                 Discover more <FiArrowUpRight />
//               </a>
//             </div>

//             <img
//               src={slide8}
//               alt="Footwear from the latest collection"
//             />
//           </article>
//         </section>

//         <section className={styles.productsSection} id="products">
//           <div className={styles.sectionHeader}>
//             <div>
//               <p className={styles.eyebrow}>CURATED FOR YOU</p>
//               <h2>Our collection</h2>
//             </div>

//             <span className={styles.productCount}>
//               {filteredProducts.length} styles
//             </span>
//           </div>

//           <div className={styles.filters}>
//             <span><FiSliders size={15} /> Categories</span>

//             {categories.map((item) => (
//               <button
//                 key={item}
//                 className={
//                   category === item ? styles.filterActive : ""
//                 }
//                 onClick={() => setCategory(item)}
//               >
//                 {item}
//               </button>
//             ))}
//           </div>

//           {filteredProducts.length > 0 ? (
//             <div className={styles.productGrid}>
//               {filteredProducts.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   onAddToCart={addToCart}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className={styles.noResults}>
//               <h3>No footwear found</h3>
//               <p>Try another search or select a different category.</p>
//               <button
//                 onClick={() => {
//                   setSearch("");
//                   setCategory("All");
//                 }}
//               >
//                 Clear filters
//               </button>
//             </div>
//           )}
//         </section>

//         <footer className={styles.footer}>
//           <span>TheShoeTrybe.</span>
//           <p>Find your fit. Own your style.</p>
//         </footer>
//       </div>

//       <div className={styles.cartColumn}>
//         <div className={styles.cartMobileHeading}>
//           Your shopping bag ({cartCount})
//         </div>

//         <CartPanel
//           items={cart}
//           onChangeQuantity={changeQuantity}
//           onRemove={removeFromCart}
//         />
//       </div>
//     </div>
//   );
// }







import { useMemo, useState } from "react";
import { FiArrowUpRight, FiSearch, FiSliders } from "react-icons/fi";

import slide8 from "../assets/slide8.jpeg";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import CartPanel from "../components/CartPanel";
import { useCart } from "../context/CartContext";
import styles from "./CustomerDashboard.module.css";

const categories = [
  "All",
  "Male Slides",
  "Female Slides",
  "Male Sandals",
  "Female Sandals",
  "Unisex",
  "Male Shoes",
  "Heels",
  "Male Briken-Stock",
  "Female Briken-stock",
  "Couples Slides",
];

export default function CustomerDashboard() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Use the SAME shared cart as the checkout page.
  const {
    cart,
    cartCount,
    addToCart,
    changeQuantity,
    removeFromCart,
  } = useCart();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "All" ||
        (product.category || "").trim().toLowerCase() ===
          category.trim().toLowerCase();

      const searchableText = [
        product.name,
        product.category,
        product.color,
        product.gender,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(
        search.trim().toLowerCase()
      );

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <div className={styles.page}>
      <div className={styles.shopContent}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>WELCOME TO THESHOETRYBE</p>

            <h1>
              Step into your <span>style.</span>
            </h1>

            <p className={styles.subtitle}>
              Discover footwear made for your everyday story.
            </p>
          </div>

          <label className={styles.search}>
            <FiSearch size={18} />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search shoes and slides..."
              aria-label="Search footwear"
            />
          </label>
        </header>

        <section className={styles.heroGrid}>
          <article className={styles.welcomeCard}>
            <p className={styles.tag}>YOUR STYLE, YOUR RULES</p>

            <h2>Find your next favourite pair.</h2>

            <p>
              From effortless slides to timeless shoes, find your perfect fit.
            </p>

            <a href="#products" className={styles.primaryButton}>
              Shop the collection <FiArrowUpRight />
            </a>
          </article>

          <article className={styles.saleCard}>
            <div className={styles.saleCopy}>
              <p className={styles.tag}>THE LATEST EDIT</p>

              <h2>Every step.</h2>
              <h3>Your statement.</h3>

              <p>Fresh styles for every occasion.</p>

              <a href="#products" className={styles.saleButton}>
                Discover more <FiArrowUpRight />
              </a>
            </div>

            <img
              src={slide8}
              alt="Footwear from the latest collection"
            />
          </article>
        </section>

        <section className={styles.productsSection} id="products">
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>CURATED FOR YOU</p>
              <h2>Our collection</h2>
            </div>

            <span className={styles.productCount}>
              {filteredProducts.length} styles
            </span>
          </div>

          <div className={styles.filters}>
            <span>
              <FiSliders size={15} /> Categories
            </span>

            {categories.map((item) => (
              <button
                type="button"
                key={item}
                className={
                  category === item ? styles.filterActive : ""
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {filteredProducts.length > 0 ? (
            <div className={styles.productGrid}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <h3>No footwear found</h3>

              <p>
                Try another search or select a different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <footer className={styles.footer}>
          <span>TheShoeTrybe.</span>
          <p>Find your fit. Own your style.</p>
        </footer>
      </div>

      <div className={styles.cartColumn}>
        <div className={styles.cartMobileHeading}>
          Your shopping bag ({cartCount})
        </div>

        <CartPanel
          items={cart}
          onChangeQuantity={changeQuantity}
          onRemove={removeFromCart}
        />
      </div>
    </div>
  );
}
