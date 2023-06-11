import { Routes, Route } from "react-router-dom";

import ProductList from "./pages/ProductList";
import Navbar from "./components/navbar/Navbar";
import Carousel from "./components/carousel/Carousel";
import FrontPage from "./components/navbar/FrontPage";
import Landing from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
