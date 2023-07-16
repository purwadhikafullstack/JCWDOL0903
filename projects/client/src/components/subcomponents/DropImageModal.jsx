import React, { Fragment, useState } from 'react'
import Modal from './Modal'
import api from '../../api/api'
import Swal from "sweetalert2";
import ImageDragAndDrop from '../ImageDragAndDrop';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

const DropImageModal = ({ id, getUsersCart, usersCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");
  console.log("ini users cart", usersCart)


  const updatePayment = async () => {
    try {
      const form = new FormData();
      form.append("user_payment", image);

      const result = await api.patch(`/transaction-header/user_payment/${id}`, form);
      

      await Swal.fire({
        icon: "success",
        title: result.data.message,
        showConfirmButton: false,
        timer: 1500,
      });

      setShowModal(false);
      getUsersCart();
    } catch (error) {
      console.log("error", error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
  

  return (
    <Fragment>
      <div className='flex flex-col justify-center items-center'>
        <button
          onClick={() => setShowModal(true)}
          className='rounded-lg bg-red-500 m-3 py-2 text-white px-5 text-center hover:bg-red-600 hover:text-white transition-all duration-300'
        >
          Upload Payment
        </button>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <h3 className='text-center font-bold text-red-500 text-3xl mt-3'>Upload Transfer Payment</h3>
        <p className='text-center my-3'>Are you sure you want to delete this item?</p>
        <div className='flex flex-col justify-center items-center'>
          <ImageDragAndDrop
            className="mt-1"
            image={image}
            setImage={setImage}
          />
          <button onClick={updatePayment} className='my-3 items-center bg-red-500 rounded-lg text-white px-3 py-1'>Send Image</button>
        </div>
       
      </Modal>
    </Fragment>
  )
}

export default DropImageModal;
