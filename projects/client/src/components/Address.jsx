import api from "../api/api.js"
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const Address = ({fetchAddress, setAddress, address}) => {
 
  const user = useSelector((state) => state.user);

  const mainAddress = async (value) => {
    const id = value.id
    const user_id = value.user_id
    const is_main = value.is_main
    const newAddress = await api.patch("/profile/address", {id, user_id, is_main})
    fetchAddress()
  }

  const deleteAddress = async (value) => {
    const id =  value.id
    await api.delete("/profile/address/", { data: { id } })
    fetchAddress()
  }

  useEffect(() => {  
    fetchAddress()
  },[])



  return (
    <>
      {address.map((value) => (
        value.is_main ? (
          <div key={value.id} className="my-4 p-4 border border-red-500 bg-white flex justify-center items-center w-3/4 rounded-lg drop-shadow-md">
            <div className="grid grid-cols-2 w-full">
              <div>
                <h1 className="mb-3">
                  <span className="text-xl font-semibold border-b-2">Alamat</span>
                </h1>
                <p><span className="font-medium mr-3 text-slate-600">Kota:</span>{value.kota}</p>
                <p><span className="font-medium mr-3 text-slate-600">Provinsi:</span>{value.provinsi}</p>
                <p><span className="font-medium mr-3 text-slate-600">Kecamatan:</span>{value.kecamatan}</p>
                <p><span className="font-medium mr-3 text-slate-600">Kode Pos:</span>{value.kode_pos}</p>
              </div>
              <div className="flex justify-end items-center">
                <p className="text-center font-medium text-slate-400 mr-2">Main Address</p>
                <CheckCircleIcon className="fill-red-500 w-8 mr-3"/>
              </div>
            </div>
          </div>
        ) : (
          <div key={value.id} className="my-4 p-4 border border-gray-500 bg-white flex justify-center items-center w-3/4 rounded-lg drop-shadow-md">
          <div className="grid grid-cols-2 w-full">
            <div>
              <h1 className="mb-3">
                <span className="text-xl font-semibold border-b-2">Alamat</span>
              </h1>
              <p><span className="font-medium mr-3 text-slate-600">Kota:</span>{value.kota}</p>
              <p><span className="font-medium mr-3 text-slate-600">Provinsi:</span>{value.provinsi}</p>
              <p><span className="font-medium mr-3 text-slate-600">Kecamatan:</span>{value.kecamatan}</p>
              <p><span className="font-medium mr-3 text-slate-600">Kode Pos:</span>{value.kode_pos}</p>
            </div>
            <div className="flex justify-end items-center">
            <div className="flex flex-col">
              <button
                onClick={() => mainAddress(value)}
                className="bg-gray-400 h-1/4 rounded-lg mr-3 px-4 font-semibold text-white hover:bg-red-500 focus:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Set as Main Address
              </button>
              <button
                onClick={() => deleteAddress(value)}
                className="bg-red-400 h-1/4 rounded-lg mr-3 mt-5 px-4 font-semibold text-white hover:bg-red-500 focus:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Delete Address
              </button>
            </div>
          </div>
          </div>
        </div>
              
        )
      ))}
    </>
  );
  
};

export default Address;
