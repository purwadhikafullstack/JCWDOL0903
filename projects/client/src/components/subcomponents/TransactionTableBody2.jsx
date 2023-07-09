
import api from "../../api/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TransactionTableBody2({transaction, status,button1, button2 }) {
  const [transHead, setTransHead] = useState([])
  const [transWaitingForPayment, setTrans] = useState([])
  const navigate = useNavigate();

  const onDetails = (headerId) => {
    navigate("/dashboard/transactions/transdet/"+ headerId)
  }
  
  useEffect(() => {
    setTransHead(transaction)
  })
  useEffect(() => {
    const filter = transaction.filter((value) => {
      return value.status === status
    })
    console.log("ini filter", filter)
    setTrans(filter)
  },[transHead])
  return (
 <tbody>
  {transWaitingForPayment.map((value) => (
    <tr className="border-b-slate-200 border text-sm">
      <td className="px-3">
        INV/{value.invoice}
      </td>
      <td className="pr-6">
        {value.Transaction_Details[0].product_name}<br/>
        <button 
        onClick={() => onDetails(value.id)}
        className="text-slate-400 hover:text-yellow-400 transition-all duration-200 "> Details</button>
      </td>
      <td>
        {value.date}
      </td>
      <td className="text-center">
        {value.Branch.name}
      </td>
      <td>
        <img src={`http://localhost:2000/static/transhead/${value.user_payment}`}/>
      </td>
      {button1 ? (
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <button className="text-teal-600 hover:text-teal-900" > 
            {button1}
        </button>
      </td>
      ):(<></>)}
      {button2 ? (
         <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
         <button className="text-red-600 hover:text-red-900 ml-4">
             {button2}
         </button>
       </td>
      ):(<></>)}
     
    </tr>
  ))}
 </tbody>
  );
}
