import React from 'react'
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import pattern from "../assets/pattern.jpg"
import Dropdown from '../components/Dropdown';
import DatePicker from '../components/DateRange';

const sortOptions = [
  { value: "", label: "None" },
  { value: "name_asc", label: "Menunggu Pembayaran" },
  { value: "name_desc", label: "Menunggu Konfirmasi Pembayaran" },
  { value: "price_asc", label: "Diproses" },
  { value: "price_desc", label: "Dikirim" },
  { value: "price_desc", label: "Pesanan Dikonfirmasi" },
  { value: "price_desc", label: "Dibatalkan" },
];

const OrderList = () => {
  return (
    <div style={{ backgroundImage: `url(${pattern})`, backgroundRepeat: 'repeat', backgroundSize: '20rem 20rem' }}>
      <div className='container-screen flex flex-col py-4'>
      <div className='font-bold text-5xl py-2 border-b-2 border-b-red-300'>
        Order List
      </div>
      <div className='flex gap-2 items-center flex-wrap'>
        <Dropdown
        label="Order Status"
        options={sortOptions}
        />
        <DatePicker/>
      </div>
      <div className='rounded-lg border mt-3 overflow-hidden bg-white'>
        <div className='bg-red-500 flex items-center justify-between'>
          <div className='flex items-center'>
            <ShoppingBagIcon className='h-9 w-9 py-1 pl-3 text-red-50'/>
            <p className='text-white mx-3'>transaction Id</p>
          </div>
          <p className='mr-3 text-yellow-300 font-semibold'>Status: <span className='text-white'>Menunggu Pembayaran</span></p>
        </div>

        <div  className=' flex items-center relative'>
          <div className='rounded-lg overflow-hidden my-4 mx-2'>
            <img className="" 
            src="https://upload.jaknot.com/2022/11/images/products/0b82ee/original/logitech-silent-plus-wireless-mouse-m331.jpg"
            style={{ width: '8rem', height: '8rem' }}>    
            </img>
          </div>
          <div className=''>
            <p className='font-bold text-xl mb-2'>Nama Produk</p>
            <p className='mb-2'>Nama Produk</p>
            <p className='mb-2'>Kalau ada lebih dari 1 produk</p>
          </div>
          <div className='absolute right-3 font-bold'>
            Total Belanja
            <p>Rp 200.000</p>
          </div>
        </div>

        <div className='flex items-center relative'>
          <button className='rounded-lg bg-red-500 m-3 py-2 text-white px-5 text-center hover:bg-red-600 hover:text-white transition-all duration-300'>Upload Payment</button>
          <button className='rounded-lg outline outline-2 outline-red-500 m-3 p-2 text-red-500 px-5 text-center hover:bg-slate-200 transition-all duration-300'>Cancle Order</button>
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default OrderList;
