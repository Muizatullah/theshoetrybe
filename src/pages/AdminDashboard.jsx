

// import {
//   FiDollarSign,
//   FiShoppingBag,
//   FiUsers,
//   FiPackage,
//   FiArrowUpRight,
// } from "react-icons/fi";

// import styles from "./AdminDashboard.module.css";

// const stats = [
//   {
//     label: "Total Revenue",
//     value: "₦0",
//     Icon: FiDollarSign,
//     note: "Sales summary",
//   },
//   {
//     label: "Total Orders",
//     value: "0",
//     Icon: FiShoppingBag,
//     note: "Orders received",
//   },
//   {
//     label: "Total Customers",
//     value: "0",
//     Icon: FiUsers,
//     note: "Registered shoppers",
//   },
//   {
//     label: "Products",
//     value: "0",
//     Icon: FiPackage,
//     note: "Products in store",
//   },
// ];

// export default function AdminDashboard() {
//   return (
//     <div className={styles.dashboard}>
//       <header className={styles.heading}>
//         <div>
//           <p className={styles.eyebrow}>
//             Quality and Classy Footwears
//           </p>

//           <h1>Store overview</h1>

//           <p>Welcome back to TheShoeTrybe.</p>
//         </div>

//         <a href="/shop" className={styles.storeButton}>
//           Visit store <FiArrowUpRight />
//         </a>
//       </header>

//       <section className={styles.stats}>
//         {stats.map(({ label, value, Icon, note }) => (
//           <article className={styles.statCard} key={label}>
//             <div className={styles.statTop}>
//               <span>{label}</span>
//               <Icon size={20} />
//             </div>

//             <strong>{value}</strong>
//             <p>{note}</p>
//           </article>
//         ))}
//       </section>

//       <section className={styles.panel}>
//         <h2>Recent orders</h2>

//         <div className={styles.emptyState}>
//           <FiShoppingBag size={28} />
//           <h3>No orders yet</h3>
//           <p>
//             Customer orders will appear here when
//             your store is connected to its backend.
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// }




import { useEffect, useMemo, useState } from "react";
import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiArrowUpRight,
  FiEye,
  FiRefreshCw,
} from "react-icons/fi";
import { Link } from "react-router";
import products from "../data/products";
import styles from "./AdminDashboard.module.css";

const ORDERS_KEY = "theshoetrybe-orders";

function readOrders() {
  try {
    const saved = localStorage.getItem(ORDERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function formatMoney(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
}

function formatDate(date) {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getStatus(order) {
  return order.status || "Pending payment";
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState(readOrders);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  useEffect(() => {
    function refreshOrders() {
      setOrders(readOrders());
      setLastUpdated(Date.now());
    }

    window.addEventListener("storage", refreshOrders);
    window.addEventListener("focus", refreshOrders);

    const interval = window.setInterval(refreshOrders, 3000);

    return () => {
      window.removeEventListener("storage", refreshOrders);
      window.removeEventListener("focus", refreshOrders);
      window.clearInterval(interval);
    };
  }, []);

  const stats = useMemo(() => {
    const revenue = orders.reduce(
      (total, order) => total + (Number(order.total) || 0),
      0
    );

    const customers = new Set(
      orders
        .map((order) => order.customer?.email?.trim().toLowerCase())
        .filter(Boolean)
    );

    return [
      {
        label: "Total Revenue",
        value: formatMoney(revenue),
        Icon: FiDollarSign,
        note: "Value of recorded orders",
      },
      {
        label: "Total Orders",
        value: orders.length.toLocaleString(),
        Icon: FiShoppingBag,
        note: "Orders received",
      },
      {
        label: "Total Customers",
        value: customers.size.toLocaleString(),
        Icon: FiUsers,
        note: "Unique customer emails",
      },
      {
        label: "Products",
        value: products.length.toLocaleString(),
        Icon: FiPackage,
        note: "Products in your catalogue",
      },
    ];
  }, [orders]);

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();

        return dateB - dateA;
      })
      .slice(0, 5);
  }, [orders]);

  return (
    <div className={styles.dashboard}>
      <header className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>QUALITY AND CLASSY FOOTWEAR</p>
          <h1>Store overview</h1>
          <p>Welcome back to TheShoeTrybe.</p>
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => {
              setOrders(readOrders());
              setLastUpdated(Date.now());
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 16px",
              border: "1px solid #e5e0d7",
              borderRadius: "10px",
              background: "#fff",
              color: "#455747",
              cursor: "pointer",
            }}
          >
            <FiRefreshCw />
            Refresh
          </button>

          <Link to="/shop" className={styles.storeButton}>
            Visit store <FiArrowUpRight />
          </Link>
        </div>
      </header>

      <section className={styles.stats}>
        {stats.map(({ label, value, Icon, note }) => (
          <article className={styles.statCard} key={label}>
            <div className={styles.statTop}>
              <span>{label}</span>
              <Icon size={20} />
            </div>

            <strong>{value}</strong>
            <p>{note}</p>
          </article>
        ))}
      </section>

      <section className={styles.panel}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "22px",
          }}
        >
          <div>
            <h2>Recent orders</h2>
            <p style={{ color: "#89877f", marginBottom: 0 }}>
              Your five most recent customer orders.
            </p>
          </div>

          <span
            style={{
              background: "#eef1e8",
              color: "#455747",
              padding: "8px 12px",
              borderRadius: "20px",
              fontSize: "13px",
            }}
          >
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </span>
        </div>

        {recentOrders.length === 0 ? (
          <div className={styles.emptyState}>
            <FiShoppingBag size={28} />
            <h3>No orders yet</h3>
            <p>
              When a customer completes checkout, their order will appear here.
            </p>

            <Link to="/shop" className={styles.storeButton}>
              Visit store <FiArrowUpRight />
            </Link>
          </div>
        ) : (
          <div style={{ width: "100%", overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                minWidth: "700px",
                borderCollapse: "collapse",
                textAlign: "left",
              }}
            >
              <thead>
                <tr style={{ background: "#f8f6f1" }}>
                  {[
                    "Order",
                    "Customer",
                    "Date",
                    "Total",
                    "Status",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      style={{
                        padding: "15px 12px",
                        fontSize: "12px",
                        color: "#77756e",
                        fontWeight: 600,
                        borderBottom: "1px solid #ece9e2",
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order, index) => {
                  const orderId =
                    order.orderNumber || order.id || order._id;

                  const customerName =
                    order.customer?.fullName ||
                    order.customer?.name ||
                    "Guest customer";

                  const status = getStatus(order);

                  return (
                    <tr key={orderId || index}>
                      <td
                        style={{
                          padding: "16px 12px",
                          borderBottom: "1px solid #ece9e2",
                          fontWeight: 600,
                        }}
                      >
                        {orderId || "Order reference unavailable"}
                      </td>

                      <td
                        style={{
                          padding: "16px 12px",
                          borderBottom: "1px solid #ece9e2",
                        }}
                      >
                        {customerName}
                      </td>

                      <td
                        style={{
                          padding: "16px 12px",
                          borderBottom: "1px solid #ece9e2",
                          color: "#77756e",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatDate(order.createdAt)}
                      </td>

                      <td
                        style={{
                          padding: "16px 12px",
                          borderBottom: "1px solid #ece9e2",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatMoney(order.total)}
                      </td>

                      <td
                        style={{
                          padding: "16px 12px",
                          borderBottom: "1px solid #ece9e2",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            padding: "7px 10px",
                            borderRadius: "20px",
                            background:
                              status.toLowerCase() === "delivered"
                                ? "#e3f3e7"
                                : status.toLowerCase() === "cancelled"
                                  ? "#fde8e7"
                                  : "#fff1d6",
                            color:
                              status.toLowerCase() === "delivered"
                                ? "#28633a"
                                : status.toLowerCase() === "cancelled"
                                  ? "#a52e2e"
                                  : "#895900",
                            fontSize: "12px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {status}
                        </span>
                      </td>

                      <td
                        style={{
                          padding: "16px 12px",
                          borderBottom: "1px solid #ece9e2",
                        }}
                      >
                        {orderId ? (
                          <Link
                            to={`/shop/orders/${encodeURIComponent(orderId)}`}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              color: "#455747",
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                            }}
                          >
                            <FiEye />
                            View order
                          </Link>
                        ) : (
                          <span style={{ color: "#89877f" }}>
                            Unavailable
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <p
          style={{
            color: "#89877f",
            fontSize: "12px",
            marginTop: "18px",
            marginBottom: 0,
          }}
        >
          Last refreshed: {new Date(lastUpdated).toLocaleTimeString()}
        </p>
      </section>
    </div>
  );
}
