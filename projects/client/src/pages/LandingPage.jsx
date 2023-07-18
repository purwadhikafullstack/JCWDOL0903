import Carousel from "../components/Carousel2";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import opencage from "opencage-api-client";
import CategoryTab from "../components/CategoryTab";
import Banner1 from "../assets/banner1.jpg";
import Banner2 from "../assets/banner2.jpg";
import Banner3 from "../assets/banner3.jpg";
import ProductChoice from "../components/ProductChoice";

const API_endpoint = `https://api.opencagedata.com/geocode/v1/json?`;
const API_key = process.env.REACT_APP_OPENCAGE_API_KEY;

function LandingPage() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLon] = useState("");
  const [suburb, setSuburb] = useState("");
  const [kota, setKota] = useState("");
  const productsGlobal = useSelector((state) => state.product);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      opencage
        .geocode({ q: `${latitude} + ${longitude}`, key: API_key })
        .then((res) => {
          setSuburb(res.results[0].components.suburb);
          setKota(res.results[0].components.city_district);
          // console.log(res);
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  }, [latitude, longitude]);

  return (
    <div>
      <Carousel className="rounded-md mt-8 container-screen" autoSlide={true}>
        <img src={Banner1} alt="product banner" />
        <img src={Banner2} alt="product banner" />
        <img src={Banner3} alt="product banner" />
      </Carousel>
      <CategoryTab className="container-screen mt-8" />
      <ProductChoice className="mt-8" />
    </div>
  );
}

export default LandingPage;
