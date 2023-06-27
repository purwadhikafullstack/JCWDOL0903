import axios from "axios";
import logo from "./logo.svg";
import "./index.css";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import ProductList from "./pages/ProductList";
import UpdateProfile from "./pages/UpdateProfile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Verification from "./pages/Verification";
import api from "./api/api";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./reducers/userSlice";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import Discount from "./pages/Discount";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import ResendVerify from "./components/ResendVerify";
import Management from "./pages/Management";
import Spinner from "./components/Spinner";

function App() {
  const [message, setMessage] = useState("");
  // const id = useSelector((state) => state.user.id);
  const user = useSelector((state) => state.user);
  // console.log("role", user.role);
  //global state variable state yg bisa digunakan disemua component
  //state,setState = state variable
  //store = reducer, dispatch = setState
  //pada saat refresh globalstate kembali ke init
  // cek token => api => user => dispatch

  //store = state
  //dispatch = setState

  // const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        setIsLoading(true);
        const user = await api
          .get("/auth/v1/" + token)
          .then((res) => res.data.user);
        dispatch(login(user));
        setIsLoading(false);
        // console.log(user);
      } catch (err) {
        setIsLoading(false);
        // console.log(err);
      }
    }
    fetchUser();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="App">
      <ResendVerify />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar /> <LandingPage />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        />
        <Route
          path="/user/settings"
          element={
            <>
              <Navbar /> <UpdateProfile />
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
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/verification/:token"
          element={<Verification />}
        />
        <Route
          path={"/changePass/:id"}
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
        {/* <Route
          path="/dashboard"
          element={
            user.id === 0 || user.role === "user" ? (
              <Navigate to="/" />
            ) : (
              <Dashboard element={null} />
            )
          }
        /> */}

        <Route
          path="/dashboard"
          element={<Dashboard element={null} />}
        />
        <Route
          path="/dashboard/management-setting"
          element={<Dashboard element={<Management />} />}
        />
        <Route
          path="/dashboard/products"
          element={<Dashboard element={null} />}
        />
        <Route
          path="/dashboard/category"
          element={<Dashboard element={<Category />} />}
        />
        <Route
          path="/dashboard/transactions"
          element={<Dashboard element={null} />}
        />
        <Route
          path="/dashboard/discounts"
          element={<Dashboard element={<Discount />} />}
        />
        <Route
          path="/dashboard/reports"
          element={<Dashboard element={null} />}
        />
      </Routes>
    </div>
  );
}

export default App;
