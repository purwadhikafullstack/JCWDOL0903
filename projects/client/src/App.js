import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar/navbar"
import Carousel from "./components/carousel/carousel"
import FrontPage from "./components/navbar/FrontPage"
import Landing from "./components/pages/landingPage"

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
      <Landing />
    </div>
  );
}

export default App;
