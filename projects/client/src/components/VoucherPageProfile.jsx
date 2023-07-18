import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../api/api'
import { convertToDate } from "../helper/date"
import { numToIDRCurrency } from "../helper/currency"


const VoucherPageProfile = () => {


const user = useSelector((state) => state.user)
const [usersVoucher, setUsersVoucher] = useState([])

const getVoucher = async () => {
    const result = await api.post("/cart/users_voucher",{user_id: user.id})
    setUsersVoucher(result.data.data)

}

useEffect(() => {
  getVoucher()
},[])


  return (
    <div className='container-screen flex flex-col p-3'>
      <div className='border-b-2 border-red-300 '>
      <h1 className='text-4xl font-semibold mr-auto my-3'>Voucher</h1>
      </div> 
    {/* ntar masukin map di sini */}
    {usersVoucher.map(value => (
      <div className='rounded-lg border mt-3 overflow-hidden bg-white'>
      <div className='bg-red-500 flex items-center justify-between relative'>
        <div className='flex flex-row'>
          <p className='ml-3 text-white font-semibold'><span className='font-semibold text-yellow-300'>Voucher Type: </span>{value.Voucher.voucher_type}</p>
          <p className='absolute right-3 text-white'><span className='font-semibold text-yellow-300'>Exp Date: </span>{convertToDate(value.expired_date)}</p>
        </div>    
      </div>
      <div className='flex flex-row relative items-center py-10'>
        <p className='font-bold text-3xl ml-3'>Discount Voucher</p>
       <p className='ml-3 font-bold text-3xl my-3 absolute right-3'>{numToIDRCurrency(value.Voucher.amount)}</p>       
      </div>
      <p className='ml-3 mb-3 font-thin italic'><span className='text-red-600 font-semibold'>* </span>Syarat dan Ketentuan Berlaku</p>
    </div>
    ))
    }
    
    </div>
  )
}

export default VoucherPageProfile