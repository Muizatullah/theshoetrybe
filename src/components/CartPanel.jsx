

// import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
// import styles from "./CartPanel.module.css";

// export default function CartPanel({ items, onChangeQuantity, onRemove }) {
//   const subtotal = items.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const shipping = items.length === 0 ? 0 : subtotal >= 50000 ? 0 : 2500;
//   const total = subtotal + shipping;
//   const totalItemCount = items.reduce((n, item) => n + item.quantity, 0);

//   return (
//     <aside className={styles.panel}>
//       <div className={styles.heading}>
//         <div>
//           <p>YOUR SELECTION</p>
//           <h2>My Cart</h2>
//         </div>

//         <span>{totalItemCount}</span>
//       </div>

//       {items.length === 0 ? (
//         <div className={styles.empty}>
//           <FiShoppingBag size={30} />
//           <h3>Your cart is waiting</h3>
//           <p>Find your perfect pair and add it here.</p>
//         </div>
//       ) : (
//         <div className={styles.items}>
//           {items.map((item) => {
//             const itemImage = item.image || item.images?.[0];

//             return (
//               <article
//                 className={styles.item}
//                 key={`${item.id}-${item.size}`}
//               >
//                 <img src={itemImage} alt={item.name} />

//                 <div className={styles.itemDetails}>
//                   <h3>{item.name}</h3>
//                   <p>Size {item.size}</p>
//                   <strong>
//                     ₦{(item.price * item.quantity).toLocaleString("en-NG")}
//                   </strong>

//                   <div className={styles.quantity}>
//                     <button
//                       aria-label="Decrease quantity"
//                       onClick={() =>
//                         onChangeQuantity(item.id, item.size, -1)
//                       }
//                     >
//                       <FiMinus size={12} />
//                     </button>

//                     <span>{item.quantity}</span>

//                     <button
//                       aria-label="Increase quantity"
//                       onClick={() =>
//                         onChangeQuantity(item.id, item.size, 1)
//                       }
//                     >
//                       <FiPlus size={12} />
//                     </button>

//                     <button
//                       className={styles.remove}
//                       aria-label={`Remove ${item.name}`}
//                       onClick={() => onRemove(item.id, item.size)}
//                     >
//                       <FiTrash2 size={13} />
//                     </button>
//                   </div>
//                 </div>
//               </article>
//             );
//           })}
//         </div>
//       )}

//       <div className={styles.summary}>
//         <div>
//           <span>Subtotal</span>
//           <strong>₦{subtotal.toLocaleString("en-NG")}</strong>
//         </div>

//         <div>
//           <span>Shipping</span>
//           <strong>
//             {shipping === 0
//               ? "FREE"
//               : `₦${shipping.toLocaleString("en-NG")}`}
//           </strong>
//         </div>

//         {subtotal > 0 && subtotal < 50000 && (
//           <p className={styles.shippingNote}>
//             Spend ₦{(50000 - subtotal).toLocaleString("en-NG")} more for free
//             shipping.
//           </p>
//         )}

//         <div className={styles.total}>
//           <span>Total</span>
//           <strong>₦{total.toLocaleString("en-NG")}</strong>
//         </div>

//         <button
//           className={styles.checkout}
//           disabled={items.length === 0}
//           onClick={() => alert("Checkout will be built in a later stage.")}
//         >
//           Proceed to checkout
//         </button>

//         <p className={styles.note}>
//           Shipping is a demo estimate and will be configurable later.
//         </p>
//       </div>
//     </aside>
//   );
// }





import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router";
import styles from "./CartPanel.module.css";

export default function CartPanel({
  items = [],
  cart,
  onChangeQuantity,
  onRemove,
}) {
  const navigate = useNavigate();

  // Supports either "items" or "cart" as the prop name.
  const cartItems = Array.isArray(items)
    ? items
    : Array.isArray(cart)
      ? cart
      : [];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping =
    cartItems.length === 0 ? 0 : subtotal >= 50000 ? 0 : 2500;

  const total = subtotal + shipping;

  const totalItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  function proceedToCheckout() {
    if (cartItems.length === 0) return;
    navigate("/shop/checkout");
  }

  return (
    <aside className={styles.panel}>
      <div className={styles.heading}>
        <div>
          <p>YOUR SELECTION</p>
          <h2>My Cart</h2>
        </div>

        <span>{totalItemCount}</span>
      </div>

      {cartItems.length === 0 ? (
        <div className={styles.empty}>
          <FiShoppingBag size={30} />
          <h3>Your cart is waiting</h3>
          <p>Find your perfect pair and add it here.</p>
        </div>
      ) : (
        <div className={styles.items}>
          {cartItems.map((item) => {
            const itemImage = item.image || item.images?.[0];

            return (
              <article
                className={styles.item}
                key={`${item.id}-${item.size}`}
              >
                {itemImage ? (
                  <img src={itemImage} alt={item.name} />
                ) : (
                  <div className={styles.empty}>
                    <FiShoppingBag size={22} />
                  </div>
                )}

                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <p>Size {item.size}</p>

                  <strong>
                    ₦{(item.price * item.quantity).toLocaleString("en-NG")}
                  </strong>

                  <div className={styles.quantity}>
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => {
                        if (item.quantity <= 1) {
                          onRemove?.(item.id, item.size);
                        } else {
                          onChangeQuantity?.(item.id, item.size, -1);
                        }
                      }}
                    >
                      <FiMinus size={12} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() =>
                        onChangeQuantity?.(item.id, item.size, 1)
                      }
                    >
                      <FiPlus size={12} />
                    </button>

                    <button
                      type="button"
                      className={styles.remove}
                      aria-label={`Remove ${item.name}`}
                      onClick={() => onRemove?.(item.id, item.size)}
                    >
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className={styles.summary}>
        <div>
          <span>Subtotal</span>
          <strong>₦{subtotal.toLocaleString("en-NG")}</strong>
        </div>

        <div>
          <span>Shipping</span>
          <strong>
            {shipping === 0
              ? "FREE"
              : `₦${shipping.toLocaleString("en-NG")}`}
          </strong>
        </div>

        {subtotal > 0 && subtotal < 50000 && (
          <p className={styles.shippingNote}>
            Spend ₦{(50000 - subtotal).toLocaleString("en-NG")} more for free
            shipping.
          </p>
        )}

        <div className={styles.total}>
          <span>Total</span>
          <strong>₦{total.toLocaleString("en-NG")}</strong>
        </div>

        <button
          type="button"
          className={styles.checkout}
          disabled={cartItems.length === 0}
          onClick={proceedToCheckout}
        >
          Proceed to checkout
        </button>

        <p className={styles.note}>
          Shipping is a demo estimate and will be configurable later.
        </p>
      </div>
    </aside>
  );
}
