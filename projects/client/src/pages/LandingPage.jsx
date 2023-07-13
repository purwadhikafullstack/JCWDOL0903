import Carousel from "../components/carousel/Carousel";
import { useState, useEffect } from "react";
import Axios from "axios";
import opencage from "opencage-api-client";

const API_endpoint = `https://api.opencagedata.com/geocode/v1/json?`;
const API_key = `bf4320abed844834a64e30080b0b5cb4`;

function LandingPage() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLon] = useState("");
  const [suburb, setSuburb] = useState("");
  const [kota, setKota] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(`lihat ini:`, position.coords.longitude);
      console.log(`lihat ini:`, position.coords.latitude);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      //    Axios.get(`${API_endpoint}q=${latitude}+${longitude}&key=${API_key}`)
      //     .then((res) => {
      //       console.log(res.data.results[0].components);
      //       setLat(res.data.results[0].geometry.lat)
      //       setLon(res.data.results[0].geometry.lng)
      //       setSuburb(res.data.results[0].components.suburb)
      //       setKota(res.data.results[0].components.state)
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      opencage
        .geocode({ q: `${latitude}+${longitude}`, key: API_key })
        .then((res) => {
          setSuburb(res.results[0].components.suburb);
          setKota(res.results[0].components.state);
          console.log(res);
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  }, [latitude, longitude]);

  return (
    <div className="App">
      <div className="absolute left-9 bg-yellow-100">
        <h3>
          {suburb}, {kota}
        </h3>
      </div>
      <Carousel />
    </div>
  );
}

export default LandingPage;
