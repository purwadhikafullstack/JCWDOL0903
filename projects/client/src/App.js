import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";

import Register from "./pages/register";
import Login from "./pages/login";
import Verification from "./pages/verification";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      );
      setMessage(data?.message || "");
    })();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/verification/:token"
          element={<Verification />}
        />
      </Routes>
    </div>
  );
}

export default App;
