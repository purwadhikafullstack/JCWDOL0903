import "./index.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import ProductList from "./pages/ProductList";
import UpdateProfile from "./pages/UpdateProfile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Verification from "./pages/Verification";

import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Category from "./pages/Category";
import Discount from "./pages/Discount";
import OrderList from "./pages/OrderList";
import ProductDetail from "./pages/ProductDetail";
import Product from "./pages/Product";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import Footer from "./components/Footer2";
import ResendVerify from "./components/ResendVerify";
import Management from "./pages/Management";
import ReferralCode from "./pages/ReferralCode";
import Reports from "./pages/Reports";
import StockHistory from "./pages/StockHistory";
import DashboardCharts from "./pages/DashboardCharts";
import SalesReport from "./pages/SalesReport";
import Transaction from "./pages/Transaction";
import TransactionDetails from "./pages/TransactionDetails";
import ProtectedPage from "./routes/ProtectedPage";

function App() {
  return (
    <div className="min-h-full flex flex-col">
      <ResendVerify />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar /> <LandingPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Register />
              <Footer />
            </>
          }
        />

        <Route
          path="/dashboard/transactions/transdet/:head"
          element={
            <>
              <Navbar />
              <TransactionDetails />
              <Footer />
            </>
          }
        />

        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <Cart />
              <Footer />
            </>
          }
        />

        <Route
          path="/order_list"
          element={
            <>
              <Navbar />
              <OrderList />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart/checkout"
          element={
            <>
              <Navbar />
              <Checkout />
              <Footer />
            </>
          }
        />

        <Route
          path="/user/settings"
          element={
            <>
              <Navbar /> <UpdateProfile /> <Footer />
            </>
          }
        />
        <Route
          path="/*"
          element={<Error />}
        />
        <Route
          path="/products"
          element={
            <>
              <Navbar />
              <ProductList />
              <Footer />
            </>
          }
        />
        <Route
          path="/products/:id"
          element={
            <>
              <Navbar />
              <ProductDetail />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/verification/:token"
          element={
            <>
              <Verification />
              <Footer />
            </>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <>
              <ForgotPassword />
              <Footer />
            </>
          }
        />
        <Route
          path={"/reset-password/:token"}
          element={
            <>
              <ResetPassword />
              <Footer />
            </>
          }
        />
        <Route
          path="/verification/:token"
          element={<Verification />}
        />
        <Route
          path={"/change-password"}
          element={<ChangePassword />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path={"/reset-password/:token"}
          element={<ResetPassword />}
        />
        <Route
          path={"/referral-code"}
          element={
            <>
              <Navbar />
              <ReferralCode />
              <Footer />
            </>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedPage adminOnly={true}>
              <Dashboard element={<DashboardCharts />} />
            </ProtectedPage>
          }
        />
        <Route
          path="/dashboard/management-setting"
          element={
            <ProtectedPage adminOnly={true}>
              <Dashboard element={<Management />} />{" "}
            </ProtectedPage>
          }
        />
        <Route
          path="/dashboard/products"
          element={
            <ProtectedPage adminOnly={true}>
              <Dashboard element={<Product />} />
            </ProtectedPage>
          }
        />
        <Route
          path="/dashboard/category"
          element={
            <ProtectedPage adminOnly={true}>
              <Dashboard element={<Category />} />
            </ProtectedPage>
          }
        />
        <Route
          path="/dashboard/transactions"
          element={
            <ProtectedPage adminOnly={true}>
              <Dashboard element={<Transaction />} />
            </ProtectedPage>
          }
        />
        <Route
          path="/dashboard/discounts"
          element={
            <ProtectedPage adminOnly={true}>
              <Dashboard element={<Discount />} />
            </ProtectedPage>
          }
        />

        <Route
          path="/dashboard/reports"
          element={
            <ProtectedPage adminOnly={true}>
              <Dashboard element={<Reports element={<SalesReport />} />} />
            </ProtectedPage>
          }
        />
        <Route
          path="/dashboard/reports/stock-history"
          element={
            <ProtectedPage adminOnly={true}>
              <Dashboard element={<Reports element={<StockHistory />} />} />
            </ProtectedPage>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
