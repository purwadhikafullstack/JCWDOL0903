import Carousel from "../components/Carousel";
import { useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import opencage from "opencage-api-client";
import UpdateProfile from "./ProductList"
import CategoryTab from "../components/CategoryTab";


const API_endpoint = `https://api.opencagedata.com/geocode/v1/json?`;
const API_key = "bf4320abed844834a64e30080b0b5cb4";

// console.log("envprocess", process.env.REACT_APP_BASE_URL);

function LandingPage() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLon] = useState("");
  const [suburb, setSuburb] = useState("");
  const [kota, setKota] = useState("");
  const productsGlobal = useSelector((state) => state.product)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      opencage
        .geocode({ q: `${latitude} + ${longitude}`, key: API_key})
        .then((res) => {
          setSuburb(res.results[0].components.suburb);
          setKota(res.results[0].components.city_district);
          console.log(res);
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  }, [latitude, longitude]);

  return (
      <div className="container-screen">
      <h3>
        Lokasi Anda: {suburb}, {kota}
      </h3>
      <Carousel />
      <CategoryTab />
      <UpdateProfile />      
    </div>
    
    
  );
}

export default LandingPage;
