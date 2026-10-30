
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  FiArrowLeft,
  FiShoppingBag,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";
import styles from "./Checkout.module.css";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartCount, cartTotal, clearCart } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    deliveryNote: "",
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const deliveryFee = cartTotal >= 100000 ? 0 : 3000;
  const grandTotal = cartTotal + deliveryFee;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    }

    if (!form.address.trim()) {
      newErrors.address = "Please enter your delivery address.";
    }

    if (!form.city.trim()) {
      newErrors.city = "Please enter your city.";
    }

    if (!form.state.trim()) {
      newErrors.state = "Please enter your state.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) return;

    if (cart.length === 0) {
      navigate("/shop");
      return;
    }

    const reference = `ST-${Date.now().toString().slice(-8)}`;

    const order = {
      orderNumber: reference,
      customer: form,
      items: cart,
      itemCount: cartCount,
      subtotal: cartTotal,
      deliveryFee,
      total: grandTotal,
      status: "Pending payment",
      createdAt: new Date().toISOString(),
    };

    // Demo only: saves this order in this browser.
    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("theshoetrybe-orders") || "[]"
      );

      localStorage.setItem(
        "theshoetrybe-orders",
        JSON.stringify([...savedOrders, order])
      );
    } catch {
      setErrors({
        form: "We couldn't save the order. Please try again.",
      });
      return;
    }

    setOrderNumber(reference);
    setOrderPlaced(true);
    clearCart();
  }

  if (orderPlaced) {
    return (
      <main className={styles.checkoutPage}>
        <section className={styles.successCard}>
          <FiCheckCircle className={styles.successIcon} />

          <p className={styles.eyebrow}>ORDER RECEIVED</p>
          <h1>Thank you for choosing TheShoeTrybe!</h1>

          <p>
            Your demo order has been saved in this browser. No payment has
            been collected, and this is not yet a live order confirmation.
          </p>

          <div className={styles.orderReference}>
            <span>Order reference</span>
            <strong>{orderNumber}</strong>
          </div>

          <Link to="/shop" className={styles.primaryButton}>
            Continue shopping
          </Link>
        </section>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className={styles.checkoutPage}>
        <section className={styles.emptyState}>
          <FiShoppingBag className={styles.emptyIcon} />
          <h1>Your bag is empty</h1>
          <p>Add some footwear to your bag before checking out.</p>
          <Link to="/shop" className={styles.primaryButton}>
            Browse the collection
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.checkoutPage}>
      <Link to="/shop" className={styles.backLink}>
        <FiArrowLeft />
        Back to shop
      </Link>

      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>THE SHOETRYBE</p>
        <h1>Checkout</h1>
        <p>Almost yours. Let's get your order details.</p>
      </header>

      <div className={styles.checkoutLayout}>
        <form className={styles.checkoutForm} onSubmit={handleSubmit}>
          <section className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <FiMapPin />
              <div>
                <h2>Delivery information</h2>
                <p>Where should we deliver your order?</p>
              </div>
            </div>

            {errors.form && (
              <p className={styles.errorMessage}>{errors.form}</p>
            )}

            <div className={styles.formGrid}>
              <label className={styles.fullWidth}>
                Full name
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
                {errors.fullName && (
                  <span className={styles.errorMessage}>
                    {errors.fullName}
                  </span>
                )}
              </label>

              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <span className={styles.errorMessage}>
                    {errors.email}
                  </span>
                )}
              </label>

              <label>
                Phone number
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  autoComplete="tel"
                />
                {errors.phone && (
                  <span className={styles.errorMessage}>
                    {errors.phone}
                  </span>
                )}
              </label>

              <label className={styles.fullWidth}>
                Delivery address
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="House number, street and area"
                  autoComplete="street-address"
                />
                {errors.address && (
                  <span className={styles.errorMessage}>
                    {errors.address}
                  </span>
                )}
              </label>

              <label>
                City
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  autoComplete="address-level2"
                />
                {errors.city && (
                  <span className={styles.errorMessage}>
                    {errors.city}
                  </span>
                )}
              </label>

              <label>
                State
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="Enter your state"
                  autoComplete="address-level1"
                />
                {errors.state && (
                  <span className={styles.errorMessage}>
                    {errors.state}
                  </span>
                )}
              </label>

              <label className={styles.fullWidth}>
                Delivery note (optional)
                <textarea
                  name="deliveryNote"
                  value={form.deliveryNote}
                  onChange={handleChange}
                  placeholder="Any directions to help us find you?"
                  rows={3}
                />
              </label>
            </div>
          </section>

          <button type="submit" className={styles.primaryButton}>
            Place demo order
          </button>

          <p className={styles.demoNote}>
            Demo checkout only. Online payment is not enabled yet.
          </p>
        </form>

        <aside className={styles.orderSummary}>
          <h2>Your order</h2>
          <p className={styles.itemCount}>
            {cartCount} {cartCount === 1 ? "item" : "items"}
          </p>

          <div className={styles.summaryItems}>
            {cart.map((item) => (
              <div
                className={styles.summaryItem}
                key={`${item.id}-${item.size}`}
              >
                <div className={styles.summaryImage}>
                  {item.images?.[0] ? (
                    <img src={item.images[0]} alt={item.name} />
                  ) : (
                    <FiShoppingBag />
                  )}
                  <span>{item.quantity}</span>
                </div>

                <div className={styles.summaryDetails}>
                  <h3>{item.name}</h3>
                  <p>Size: {item.size}</p>
                </div>

                <strong>
                  ₦{(item.price * item.quantity).toLocaleString("en-NG")}
                </strong>
              </div>
            ))}
          </div>

          <div className={styles.summaryLine}>
            <span>Subtotal</span>
            <span>₦{cartTotal.toLocaleString("en-NG")}</span>
          </div>

          <div className={styles.summaryLine}>
            <span>Delivery</span>
            <span>
              {deliveryFee === 0
                ? "Free"
                : `₦${deliveryFee.toLocaleString("en-NG")}`}
            </span>
          </div>

          <p className={styles.shippingNote}>
            Demo delivery fee: ₦3,000, waived for orders of ₦100,000 or more.
            You can change this rule to match your actual delivery policy.
          </p>

          <div className={styles.totalLine}>
            <span>Total</span>
            <strong>₦{grandTotal.toLocaleString("en-NG")}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}
