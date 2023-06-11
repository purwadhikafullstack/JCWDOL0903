import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Verification = () => {
  const params = useParams();
  useEffect(() => {
    alert(params.token);
  }, []);
  return <div>Activated Register Succesfully</div>;
};

export default Verification;
