import { Routes, Route } from "react-router-dom";

import ProductList from "./pages/ProductList";
import Navbar from "./components/navbar/Navbar";
import Landing from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CategoryTable from "./components/CategoryTable";

function App() {
  return (
    <div className="App bg-white">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/dashboard" element={<Dashboard element={null} />} />
        <Route
          path="/dashboard/products"
          element={<Dashboard element={<CategoryTable />} />}
        />
        <Route
          path="/dashboard/transactions"
          element={<Dashboard element={null} />}
        />
        <Route
          path="/dashboard/discounts"
          element={<Dashboard element={null} />}
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
