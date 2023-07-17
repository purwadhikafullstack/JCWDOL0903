import React, { Fragment, useState } from 'react'
import Modal from './Modal'
import api from '../../api/api'
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

const WarningModalOrderList = ({headersId, getUsersCart}) => {
    const [showModal, setShowModal] = useState(false)

    const deleteItemTotally = async() =>{
        try{
            const result = await api.patch("/transactions/" + headersId, {status: "Dibatalkan"} )
            await Swal.fire({
                icon: "success",
                title: result.data.message,
                showConfirmButton: false,
                timer: 1500,
              });

              setShowModal(false)
              getUsersCart()
              
             
        }
        catch (error) {
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
            <button onClick={()=> setShowModal(true)} className='rounded-lg outline outline-2 outline-red-500 m-3 p-2 text-red-500 px-5 text-center hover:bg-slate-200 transition-all duration-300'>
                Cancel Order
            </button>
        </div>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}> 
            <h3 className='text-center font-bold text-red-500 text-3xl mt-3'>Delete Item?</h3>
            <p> Are you sure you want to cancle this order ?</p>
            <div>
                <button onClick={() => deleteItemTotally()} className='bg-green-500 rounded-lg mx-3 my-5 text-white px-5 text-center'>
                    Yes
                </button>
                <button  onClick={()=> setShowModal(false)} className='bg-red-500 rounded-lg mx-3 my-5 text-white px-5 text-center' >
                    No
                </button>
            </div>
        
        </Modal>
    </Fragment>    
  )
}

export default WarningModalOrderList