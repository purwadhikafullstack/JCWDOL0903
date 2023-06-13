import axios from "axios";
import logo from "./logo.svg";
import "./index.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
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
import ProductInventory from "./pages/ProductInventory";
import Discount from "./components/Discount";

function App() {
  const [message, setMessage] = useState("");
  //global state variable state yg bisa digunakan disemua component
  //state,setState = state variable
  //store = reducer, dispatch = setState
  //pada saat refresh globalstate kembali ke init
  // cek token => api => user => dispatch

  //store = state
  //dispatch = setState

  // const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        const user = await api
          .get("/auth/v1/" + token)
          .then((res) => res.data.user);
        dispatch(login(user));
        // console.log(user);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="App">
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
        <Route path="/verification/:token" element={<Verification />} />
        <Route path="/dashboard" element={<Dashboard element={null} />} />
        <Route
          path="/dashboard/products"
          element={<Dashboard element={<ProductInventory />} />}
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
