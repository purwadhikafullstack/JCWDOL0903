import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";

function App() {
  return (
    <div className="App bg-white mx-auto w-[80%] max-w-screen-xl">
      <Routes>
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </div>
  );
}

export default App;
