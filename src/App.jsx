


// import { Navigate, Route, Routes } from "react-router";

// import CustomerLayout from "./layouts/CustomerLayout";
// import AdminLayout from "./layouts/AdminLayout";

// import CustomerDashboard from "./pages/CustomerDashboard";
// import ProductDetails from "./pages/ProductDetails";
// import AdminDashboard from "./pages/AdminDashboard";
// // import NotFound from "./pages/NotFound";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/shop" replace />} />

//       <Route path="/shop" element={<CustomerLayout />}>
//         <Route index element={<CustomerDashboard />} />
//         <Route path="product/:id" element={<ProductDetails />} />
//       </Route>

//       <Route path="/admin" element={<AdminLayout />}>
//         <Route index element={<AdminDashboard />} />
//       </Route>

//       {/* <Route path="*" element={<NotFound />} /> */}
//     </Routes>
//   );
// }




import { Navigate, Route, Routes } from "react-router";

import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";

import CustomerDashboard from "./pages/CustomerDashboard";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";

// import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/shop" replace />} />

      <Route path="/shop" element={<CustomerLayout />}>
        <Route index element={<CustomerDashboard />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="orders" element={<MyOrders />} />
        
        <Route path="orders/:id" element={<OrderDetails />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />

      </Route>

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
