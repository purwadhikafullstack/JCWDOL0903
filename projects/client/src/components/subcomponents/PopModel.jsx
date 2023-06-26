import React, { Fragment, useState } from 'react'
import Modal from './Modal'
import api from '../../api/api'
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

const PopModel = ({fetchAddress, setAddress, address}) => {
    const [showModal, setShowModal] = useState(false)
    const user = useSelector((state) => state.user);  
    const onSubmit = async (e) => {
        e.preventDefault()     
        const data = {
            kota: document.getElementById("kota").value,
            provinsi: document.getElementById("provinsi").value,
            kecamatan: document.getElementById("kecamatan").value,
            kode_pos: document.getElementById("kode_pos").value,
        };

        try{
            const result = await api.post("/profile/address/" + user.id, data )
            await Swal.fire({
                icon: "success",
                title: result.data.message,
                showConfirmButton: false,
                timer: 1500,
              });

              setShowModal(false)
              fetchAddress()
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
            <button onClick={()=> setShowModal(true)} className='text-white bg-red-500 hover:bg-red-700 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center my-5'>
                Add New Address
            </button>
        </div>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}> 
            <h3 className='text-center font-bold text-red-500 text-3xl mt-3'>Add New Address</h3>
        <form
        className="space-y-6"
        onSubmit={onSubmit}
      >
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                Kota
              </label>
              <div className="mt-1">
                <input
                  id="kota"
                  name="kota"
                  type="text"
                  autoComplete="kota"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
              >
                Provinsi
              </label>
              <div className="mt-1">
                <input
                  id="provinsi"
                  name="provinsi"
                  type="provinsi"
                  autoComplete="provinsi"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
              >
                Kecamatan
              </label>
              <div className="mt-1">
                <input
                  id="kecamatan"
                  name="kecamatan"
                  type="kecamatan"
                  autoComplete="kecamatan"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
              >
                Kode Pos
              </label>
              <div className="mt-1">
                <input
                  id="kode_pos"
                  name="kode_pos"
                  type="kode_pos"
                  autoComplete="kode_pos"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
        </Modal>
    </Fragment>    
  )
}

export default PopModel