
import api from "../../api/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TransactionTableBody() {
  const user = useSelector((state) => state.user)
  const [transHead, setTransHead] = useState([])
  const [transWaitingForPayment, setTrans] = useState([])
  const navigate = useNavigate();

  const getTransHead = async() => {
    const result = await api.post("/transaction/get_transactions", {branch_id: user.branch_id} ) 
    setTransHead(result.data.data.Transaction_Header.rows)
  }

  const onDetails = (headerId) => {
    navigate("/dashboard/transactions/transdet/"+ headerId)
  }
  useEffect(() => {
    getTransHead()
  },[])
  
  useEffect(() => {
    const filter = transHead.filter((value) => {
      return value.status === "Menunggu Pembayaran"
    })
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
    </tr>
  ))}
 </tbody>
  );
}
