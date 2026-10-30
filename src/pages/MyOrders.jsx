
import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FiPackage,
  FiArrowRight,
  FiShoppingBag,
  FiCalendar,
} from "react-icons/fi";

import styles from "./MyOrders.module.css";

const ORDERS_STORAGE_KEY = "theshoetrybe-orders";

function readOrders() {
  try {
    const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
    const orders = saved ? JSON.parse(saved) : [];
    return Array.isArray(orders) ? orders : [];
  } catch {
    return [];
  }
}

function formatPrice(amount) {
  return `₦${Number(amount || 0).toLocaleString("en-NG")}`;
}

function formatDate(date) {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getStatusClass(status) {
  const value = (status || "Pending").toLowerCase();

  if (value.includes("deliver")) return styles.delivered;
  if (value.includes("ship")) return styles.shipped;
  if (value.includes("process")) return styles.processing;
  if (value.includes("cancel")) return styles.cancelled;

  return styles.pending;
}

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(readOrders());
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>YOUR ACCOUNT</p>
          <h1>My Orders</h1>
          <p>Keep track of your footwear orders in one place.</p>
        </div>

        <Link to="/shop" className={styles.shopButton}>
          <FiShoppingBag />
          Continue shopping
        </Link>
      </header>

      <section className={styles.orderStats}>
        <div>
          <span>Total orders</span>
          <strong>{orders.length}</strong>
        </div>

        <div>
          <span>Pending orders</span>
          <strong>
            {
              orders.filter((order) =>
                (order.status || "Pending").toLowerCase().includes("pending")
              ).length
            }
          </strong>
        </div>

        <div>
          <span>Delivered orders</span>
          <strong>
            {
              orders.filter((order) =>
                (order.status || "").toLowerCase().includes("deliver")
              ).length
            }
          </strong>
        </div>
      </section>

      <section className={styles.ordersSection}>
        <div className={styles.sectionHeading}>
          <div>
            <h2>Order history</h2>
            <p>
              {orders.length === 1
                ? "You have placed 1 order."
                : `You have placed ${orders.length} orders.`}
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <FiPackage />
            </div>

            <h2>No orders yet</h2>
            <p>
              Your orders will appear here after you complete checkout.
            </p>

            <Link to="/shop" className={styles.shopButton}>
              Explore footwear <FiArrowRight />
            </Link>
          </div>
        ) : (
          <div className={styles.orderList}>
            {[...orders].reverse().map((order, index) => {
              const orderId = order.orderNumber || `order-${index}`;
              const itemCount =
                order.itemCount ??
                (order.items || []).reduce(
                  (total, item) => total + (Number(item.quantity) || 0),
                  0
                );

              return (
                <article className={styles.orderCard} key={orderId}>
                  <div className={styles.orderTop}>
                    <div className={styles.orderIcon}>
                      <FiPackage />
                    </div>

                    <div className={styles.orderIdentity}>
                      <h3>Order #{orderId}</h3>

                      <p>
                        <FiCalendar />
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`${styles.status} ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>

                  <div className={styles.orderProducts}>
                    {(order.items || []).slice(0, 3).map((item, itemIndex) => {
                      const image = item.images?.[0] || item.image;

                      return (
                        <div
                          className={styles.productPreview}
                          key={`${item.id}-${item.size}-${itemIndex}`}
                        >
                          {image ? (
                            <img src={image} alt={item.name} />
                          ) : (
                            <div className={styles.imagePlaceholder}>
                              <FiShoppingBag />
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {(order.items || []).length > 3 && (
                      <span className={styles.moreProducts}>
                        +{order.items.length - 3}
                      </span>
                    )}

                    <div className={styles.orderAmount}>
                      <span>{itemCount} items</span>
                      <strong>{formatPrice(order.total)}</strong>
                    </div>
                  </div>

                  <div className={styles.orderBottom}>
                    <span>
                      {order.customer?.fullName || "Customer"}
                    </span>

                    <Link
                      to={`/shop/orders/${encodeURIComponent(orderId)}`}
                      className={styles.detailsLink}
                    >
                      View details <FiArrowRight />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <p className={styles.demoNote}>
        Orders are currently stored in this browser for demonstration purposes.
      </p>
    </main>
  );
}
