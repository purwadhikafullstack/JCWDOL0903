import Table from "../Table"
import TransactionTableBody from "./TransactionTableBody2"
import api from "../../api/api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteConfirmationAlert,
  errorAlert,
  errorAlertWithMessage,
  successAlert,
} from "../../helper/alerts";
export default function TransactionWaitingForConfirmation() {

const user = useSelector((state) => state.user)
const [transHead, setTransHead] = useState([])

const getTransHead = async() => {
    const result = await api.post("/transaction/get_transactions" , {branch_id: user.branch_id}) 
    setTransHead(result.data.data.Transaction_Header.rows)
    }

    async function changeStatusToDeliver(transactionId) {
      try {
        const res = await api.patch(`/transactions/${transactionId}`, {
          status: "Diproses",
        });
        if (res.status === 200) successAlert("Order Delivered!");
        getTransHead();
      } catch (err) {
        errorAlert();
      }
    }
  
    function cancelOrder(transactionId) {
      deleteConfirmationAlert(() =>
        api
          .patch(`/transactions/${transactionId}`, {
            status: "Menunggu Pembayaran",
          })
          .then((res) => {
            if (res.status === 200) successAlert("Order Canceled!");
            getTransHead();
          })
          .catch((err) => errorAlertWithMessage(err.response.data.error))
      );
    }

    useEffect(() => {
        getTransHead()
    },[])

    return (
      <div className="sm:flex sm:items-center">
        <Table
            className="mb-4"
            headCols={[
              "Invoice No.",
              "Product",             
              "Date",
              "Branch",
              "Payment"
            ]}
            tableBody={
              <TransactionTableBody transaction={transHead} status={"Menunggu Konfirmasi Pembayaran"} button1={"Process"} button2={"Cancle"}onClickBtn1={changeStatusToDeliver}
              onClickBtn2={cancelOrder}
              />
            }
          />
        
      </div>
    );
  }