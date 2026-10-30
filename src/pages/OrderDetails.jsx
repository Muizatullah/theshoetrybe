
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  FiArrowLeft,
  FiPackage,
  FiMapPin,
  FiCalendar,
  FiShoppingBag,
  FiCheckCircle,
} from "react-icons/fi";

import styles from "./OrderDetails.module.css";

const STORAGE_KEY = "theshoetrybe-orders";

function getOrders() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatPrice(amount) {
  return `₦${Number(amount || 0).toLocaleString("en-NG")}`;
}

function formatDate(date) {
  if (!date) return "Date unavailable";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Date unavailable";

  return parsed.toLocaleString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OrderDetails() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const order = orders.find(
    (item) => String(item.orderNumber) === decodeURIComponent(id || "")
  );

  if (!order) {
    return (
      <main className={styles.page}>
        <section className={styles.emptyState}>
          <FiPackage className={styles.emptyIcon} />
          <h1>We couldn't find that order</h1>
          <p>
            The order may not exist in this browser, or it may have been
            cleared from local storage.
          </p>
          <Link to="/shop/orders" className={styles.primaryButton}>
            <FiArrowLeft /> Back to my orders
          </Link>
        </section>
      </main>
    );
  }

  const customer = order.customer || {};
  const items = Array.isArray(order.items) ? order.items : [];
  const subtotal =
    order.subtotal ??
    items.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
      0
    );

  const deliveryFee = Number(order.deliveryFee || 0);
  const total = Number(order.total ?? subtotal + deliveryFee);
  const status = order.status || "Pending";

  return (
    <main className={styles.page}>
      <Link to="/shop/orders" className={styles.backLink}>
        <FiArrowLeft /> Back to my orders
      </Link>

      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>THE SHOETRYBE · ORDER DETAILS</p>
          <h1>Order summary</h1>
          <p>Thank you for shopping with us.</p>
        </div>

        <span className={styles.status}>
          <FiCheckCircle /> {status}
        </span>
      </header>

      <section className={styles.orderBanner}>
        <div>
          <span>Order reference</span>
          <h2>{order.orderNumber}</h2>
        </div>

        <div>
          <span><FiCalendar /> Order date</span>
          <strong>{formatDate(order.createdAt)}</strong>
        </div>
      </section>

      <div className={styles.layout}>
        <section className={styles.mainColumn}>
          <div className={styles.card}>
            <div className={styles.cardHeading}>
              <FiShoppingBag />
              <div>
                <h2>Items ordered</h2>
                <p>{items.length} product type(s) in this order</p>
              </div>
            </div>

            {items.length === 0 ? (
              <p className={styles.muted}>No item details were saved.</p>
            ) : (
              <div className={styles.itemList}>
                {items.map((item, index) => {
                  const image = item.images?.[0] || item.image;

                  return (
                    <article
                      className={styles.item}
                      key={`${item.id}-${item.size}-${index}`}
                    >
                      <div className={styles.itemImage}>
                        {image ? (
                          <img src={image} alt={item.name} />
                        ) : (
                          <FiShoppingBag />
                        )}
                      </div>

                      <div className={styles.itemInfo}>
                        <h3>{item.name}</h3>
                        <p>Size: {item.size || "Not specified"}</p>
                        <p>Quantity: {item.quantity || 1}</p>
                      </div>

                      <strong>
                        {formatPrice(
                          Number(item.price || 0) *
                            Number(item.quantity || 1)
                        )}
                      </strong>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeading}>
              <FiMapPin />
              <div>
                <h2>Delivery information</h2>
                <p>Where this order is intended to be delivered</p>
              </div>
            </div>

            <div className={styles.deliveryDetails}>
              <strong>{customer.fullName || "Name not provided"}</strong>
              <p>{customer.phone || "Phone not provided"}</p>
              <p>{customer.email || "Email not provided"}</p>
              <p>{customer.address || "Address not provided"}</p>
              <p>
                {[customer.city, customer.state].filter(Boolean).join(", ") ||
                  "Location not provided"}
              </p>

              {customer.deliveryNote && (
                <p className={styles.deliveryNote}>
                  Delivery note: {customer.deliveryNote}
                </p>
              )}
            </div>
          </div>
        </section>

        <aside className={styles.summaryCard}>
          <h2>Payment summary</h2>

          <div className={styles.summaryLine}>
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>

          <div className={styles.summaryLine}>
            <span>Delivery fee</span>
            <strong>{deliveryFee ? formatPrice(deliveryFee) : "Free"}</strong>
          </div>

          <div className={styles.totalLine}>
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>

          <div className={styles.paymentNotice}>
            <FiPackage />
            <p>
              <strong>Demo order</strong>
              <span>
                Online payment and live delivery tracking have not been
                connected yet.
              </span>
            </p>
          </div>

          <Link to="/shop" className={styles.primaryButton}>
            Continue shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}
