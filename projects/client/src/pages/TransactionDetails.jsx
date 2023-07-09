import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Import useParams
import Pagination from "../components/Pagination";
import ProductForm from "../components/ProductForm";
import Table from "../components/Table";
import Dropdown from "../components/Dropdown";
import AddTransactionHeader from "../components/TransactionHeader";
import TransitionFade from "../components/TransitionFade";
import NavDashGlobal from "../components/NavDashGlobal";
import api from "../api/api";
import { numToIDRCurrency } from "../helper/currency";
import pattern from "../assets/pattern.jpg"


export default function TransactionDetails() {
  const [transDet, setTransDet] = useState([]);
  const { head } = useParams(); // Get the 'head' parameter from the URL
  const [message, setMessage] = useState("")
  const [totalAmount, setTotalAmount] = useState(0);


  const getTransDet = async (transHeadId) => {
    try {
      const result = await api.get(`/transdet/${transHeadId}`);
      console.log("Result:", result.data.data.Transaction_Details);
      setTransDet(result.data.data.Transaction_Details);
      setMessage(result.data.data.Transaction_Details[0].Transaction_Header.invoice);

      // Calculate the total amount
      const totalPrice = result.data.data.Transaction_Details.reduce(
        (total, value) => total + value.qty * value.product_price,
        0
      );
      setTotalAmount(totalPrice);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getTransDet(head);
  }, [head]);
  useEffect(() => {
    getTransDet(head); // Use the 'head' parameter as the argument
  }, [head]); // Add 'head' as a dependency for useEffect

  return (
    <div 
    className="-z-10"
    style={{
        backgroundImage: `url(${pattern})`,
        backgroundRepeat: "repeat",
        backgroundSize: "20rem 20rem",
      }}>
        <section className="container-screen mt-3">
      <AddTransactionHeader
            title="Transaction Details"
            desc= "Details of Users Order"
        />
        <section className="rounded-lg border mt-3 overflow-hidden bg-white mb-20">
            <div className="bg-red-500 text-white p-3">
                <span className="font-semibold text-yellow-400">Invoice No : </span> INV/{message}
            </div>
            <div >
            {transDet.map((value)=>(
                <div className="border border-b-1 p-3 flex flex-row">
                    <img className="" 
                        src={value.Product.image_url}
                        style={{ width: '8rem', height: '8rem' }}>    
                    </img>
                    <div className="w-1/2 ">
                        <p className="font-bold">{value.Product.name}</p>
                        {value.qty} X {numToIDRCurrency(value.product_price)}
                    </div>
                    <div className="ml-auto">
                        <span className="font-bold text-red-500">Total :</span> {numToIDRCurrency(value.qty * value.product_price)}
                    </div>
                </div>
            ))} 
            </div>
            <div className="flex flex-row m-3 font-bold">
                <div className="ml-auto">
                    <span className="font-bold text-xl text-red-500">Total Amount : </span> {numToIDRCurrency(totalAmount)}
                </div>     
            </div>
        </section>
    </section>
    </div>
    
  );
}
