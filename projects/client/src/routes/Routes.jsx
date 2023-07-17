import { Route } from "react-router-dom";

import Error from "../pages/Error";
import ResendVerify from "../components/ResendVerify";
import Navbar from "../components/Navbar";
import LandingPage from "../pages/LandingPage";
import Footer from "../components/Footer2";
import Register from "../pages/Register";
import TransactionDetails from "../pages/TransactionDetails";
import Cart from "../pages/Cart";
import OrderList from "../pages/OrderList";
import Checkout from "../pages/Checkout";
import UpdateProfile from "../pages/UpdateProfile";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import Login from "../pages/Login";
import Verification from "../pages/Verification";
import ChangePassword from "../pages/ChangePassword";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ReferralCode from "../pages/ReferralCode";
import ProtectedPage from "./ProtectedPage";
import Dashboard from "../pages/Dashboard";
import DashboardCharts from "../pages/DashboardCharts";
import Management from "../pages/Management";
import Product from "../pages/Product";
import Category from "../pages/Category";
import Transaction from "../pages/Transaction";
import Discount from "../pages/Discount";
import SalesReport from "../pages/SalesReport";
import Reports from "../pages/Reports";
import StockHistory from "../pages/StockHistory";

const routes = [
  <Route
    path="/"
    element={
      <>
        <ResendVerify />
        <Navbar /> <LandingPage />
        <Footer />
      </>
    }
  />,
  <Route
    path="/register"
    element={
      <>
        <Register />
        <Footer />
      </>
    }
  />,
  <Route
    path="/dashboard/transactions/transdet/:head"
    element={
      <>
        <Navbar />
        <TransactionDetails />
        <Footer />
      </>
    }
  />,
  <Route
    path="/cart"
    element={
      <>
        <Navbar />
        <Cart />
        <Footer />
      </>
    }
  />,
  <Route
    path="/order_list"
    element={
      <>
        <ResendVerify />
        <Navbar />
        <OrderList />
        <Footer />
      </>
    }
  />,
  <Route
    path="/cart/checkout"
    element={
      <>
        <ResendVerify />
        <Navbar />
        <Checkout />
        <Footer />
      </>
    }
  />,
  <Route
    path="/user/settings"
    element={
      <>
        <ResendVerify />
        <Navbar /> <UpdateProfile /> <Footer />
      </>
    }
  />,
  <Route
    path="/products"
    element={
      <>
        <Navbar />
        <ProductList />
        <Footer />
      </>
    }
  />,
  <Route
    path="/products/:id"
    element={
      <>
        <ResendVerify />
        <Navbar />
        <ProductDetail />
        <Footer />
      </>
    }
  />,
  <Route
    path="/login"
    element={
      <>
        <Login />
        <Footer />
      </>
    }
  />,
  <Route
    path="/verification/:token"
    element={
      <>
        <Verification />
        <Footer />
      </>
    }
  />,
  <Route
    path={"/change-password"}
    element={
      <>
        <ChangePassword />
        <Footer />
      </>
    }
  />,
  <Route
    path="/forgot-password"
    element={
      <>
        <ForgotPassword />
        <Footer />
      </>
    }
  />,
  <Route
    path={"/reset-password/:token"}
    element={
      <>
        <ResetPassword />
        <Footer />
      </>
    }
  />,
  <Route
    path={"/referral-code"}
    element={
      <>
        <ResendVerify />
        <Navbar />
        <ReferralCode />
        <Footer />
      </>
    }
  />,
  <Route
    path="/dashboard"
    element={
      <ProtectedPage adminOnly={true}>
        <Dashboard element={<DashboardCharts />} />
      </ProtectedPage>
    }
  />,
  <Route
    path="/dashboard/management-setting"
    element={
      <ProtectedPage adminOnly={true}>
        <Dashboard element={<Management />} />{" "}
      </ProtectedPage>
    }
  />,
  <Route
    path="/dashboard/products"
    element={
      <ProtectedPage adminOnly={true}>
        <Dashboard element={<Product />} />
      </ProtectedPage>
    }
  />,
  <Route
    path="/dashboard/category"
    element={
      <ProtectedPage adminOnly={true}>
        <Dashboard element={<Category />} />
      </ProtectedPage>
    }
  />,
  <Route
    path="/dashboard/transactions"
    element={
      <ProtectedPage adminOnly={true}>
        <Dashboard element={<Transaction />} />
      </ProtectedPage>
    }
  />,
  <Route
    path="/dashboard/discounts"
    element={
      <ProtectedPage adminOnly={true}>
        <Dashboard element={<Discount />} />
      </ProtectedPage>
    }
  />,
  <Route
    path="/dashboard/reports"
    element={
      <ProtectedPage adminOnly={true}>
        <Dashboard element={<Reports element={<SalesReport />} />} />
      </ProtectedPage>
    }
  />,
  <Route
    path="/dashboard/reports/stock-history"
    element={
      <ProtectedPage adminOnly={true}>
        <Dashboard element={<Reports element={<StockHistory />} />} />
      </ProtectedPage>
    }
  />,
  <Route path="/*" element={<Error />} />,
];

export default routes;
