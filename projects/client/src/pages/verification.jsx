import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Verification = () => {
  const [isVerified, setIsVerified] = useState(false);
  const token = useParams().token;
  useEffect(() => {
    axios.post("http://localhost:2000/auth/verify", { token }).then((res) => {
      if (res.data.message === "Verified") setIsVerified(true);
    });
  }, []);
  return (
    <div>
      {isVerified ? <p>Activated Register Succesfully</p> : <p>Loading....</p>}
    </div>
  );
};

export default Verification;
