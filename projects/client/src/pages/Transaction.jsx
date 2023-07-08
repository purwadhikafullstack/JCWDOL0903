import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import ProductForm from "../components/ProductForm";
import Table from "../components/Table";
import Dropdown from "../components/Dropdown";
import AddTransactionHeader from "../components/TransactionHeader";
import TransitionFade from "../components/TransitionFade";
import NavDashGlobal from "../components/NavDashGlobal"



const categoryOptions = [{ value: "", label: "None" }];


export default function Transaction() {
  const dispatch = useDispatch();
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showEditProductForm, setShowEditProductForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editedProduct, setEditedProduct] = useState({});

  const init = [
    {name: "Waiting for Payment",current: true},
    {name: "Waiting for Confirmation",current: false},
    {name: "In Process",current: false},
    {name: "On Delivery",current: false},
    {name: "Order Confirmed",current: false},
    {name: "Order Cancled",current: false},
  ]

  return (
    <div>
      <TransitionFade show={showAddProductForm}>
        <ProductForm
          action="add"
          setShowForm={setShowAddProductForm}
          categoryOptions={categoryOptions}
          currPage={currentPage}
        />
      </TransitionFade>

      <TransitionFade show={showEditProductForm}>
        <ProductForm
          action="edit"
          setShowForm={setShowEditProductForm}
          categoryOptions={categoryOptions}
          currPage={currentPage}
          product={editedProduct}
        />
      </TransitionFade>
      <TransitionFade show={!showAddProductForm && !showEditProductForm}>
        <div>
          <AddTransactionHeader
            title="Transaction"
            desc="A list of all transaction."   
          />
          <NavDashGlobal init={init}/>
          
        </div>
      </TransitionFade>
    </div>
  );
}