import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar/navbar";
import Carousel from "./components/carousel/carousel";
import FrontPage from "./components/navbar/FrontPage";
import Landing from "./components/pages/landingPage";

function App() {
  return (
    <div className="App bg-white mx-auto w-[80%] max-w-screen-xl">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </div>
  );
}

export default App;
