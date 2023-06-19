import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const token = useParams().token;
  useEffect(() => {
    // console.log(token);
    async function verify() {
      await axios
        .post(
          "http://localhost:2000/auth/verify",
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
    <div>
      <div className=" flex flex-col text-center text-4xl h-28 mt-11 ">
        {isVerified ? (
          <p>Activated Register Succesfully</p>
        ) : (
          <p>Loading....</p>
        )}
      </div>
      <div>
        <button
          className="w-32 h-auto flex-shrink-0 rounded-lg bg-red-800 p-1 text-white  hover:bg-red-100 transition-colors duration-300 ease-in-out hover:text-red-700"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Verification;
