import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import api from "../api/api";

const Verification = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const token = useParams().token;
  useEffect(() => {
    // console.log(token);
    async function verify() {
      await api
        .post(
          "/auth/verify",
          {},
          {
            headers: {
              token,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "Verified") setIsVerified(true);
        });
    }

    verify();
  }, []);

  return (
    <div className="text-center">
      <div className=" flex flex-col items-center text-center text-4xl h-28 mt-11 ">
        {isVerified ? <p>Activated Register Succesfully</p> : <Spinner />}
      </div>
      {/* <div> */}
      <button
        className="mx-auto w-32 h-auto flex-shrink-0 rounded-lg bg-red-800 p-1 text-white  hover:bg-red-100 transition-colors duration-300 ease-in-out hover:text-red-700"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button>
      {/* </div> */}
    </div>
  );
};

export default Verification;
