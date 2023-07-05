import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import pattern from "../assets/pattern.jpg"
import Dropdown from '../components/Dropdown';
import DatePicker from '../components/DateRange';
import api from '../api/api';
import { numToIDRCurrency } from '../helper/currency';
import { convertToDate } from '../helper/date'
import Pagination from '../components/Pagination';
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";


const sortOptions = [
  { value: "", label: "None" },
  { value: "Menunggu Pembayaran", label: "Menunggu Pembayaran" },
  { value: "Menunggu Konfirmasi Pembayaran", label: "Menunggu Konfirmasi Pembayaran" },
  { value: "Diproses", label: "Diproses" },
  { value: "Dikirim", label: "Dikirim" },
  { value: "Pesanan Dikonfirmasi", label: "Pesanan Dikonfirmasi" },
  { value: "Dibatalkan", label: "Dibatalkan" },
];

const sortBy = [
  { value: "", label: "None" },
  { value: "invoice_asc", label: "Invoice (newer - older)" },
  { value: "invoice_desc", label: "Invoice (older - newer)" },
  { value: "date_asc", label: "Date (newer - older)" },
  { value: "date_desc", label: "Date (older - newer)" },
];

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const user = useSelector((state) => state.user)
  const [usersCart, setUsersCart] = useState([])
  const [count, setCount] = useState()
  const [statusFilter, setstatusFilter] = useState(sortOptions[0]);
  const [sortByOption, setSortByOption] = useState(sortBy[0])
  const [searchFilter, setSearchFilter] = useState("")
  
  const [dates, setDates] = useState([]);

  useEffect(()=> console.log(dates) ,[dates])

 
  const getUsersCart = async() => {
    const result = await api.get("/transaction/get_transaction/" + user.id + `?page=${currentPage}` + `&status=${statusFilter.value}` + `&q=${searchFilter}` + `&sort=${sortByOption.value}` + `&startDate=${dates[0]}` + `&endDate=${dates[1]}`) 
    setUsersCart(result.data.data.Transaction_Header.rows)
    setCount(result.data.data.count.count)    
  }
  useEffect(() => {
    
    getUsersCart()
  },[user, currentPage, statusFilter, searchFilter, sortByOption, dates]) 


  function handleSubmit(e) {
    e.preventDefault();
    const searchFilter = e.target.search.value.trim();
    setSearchFilter(searchFilter);
  }
  
  console.log("ini user Cart", usersCart)
  console.log("ini count", count)
  console.log("ini statusFilter", statusFilter)
  console.log("ini sortBy", sortByOption)
  console.log("ini searchFilter", searchFilter)

  return (
    <div style={{ backgroundImage: `url(${pattern})`, backgroundRepeat: 'repeat', backgroundSize: '20rem 20rem' }}>
      <div className='container-screen flex flex-col py-4'>
      <div className='font-bold text-5xl py-2 border-b-2 border-b-red-300 mb-4'>
        Order List
      </div>
      <div className='flex gap-2 items-center flex-wrap'>
        
        <DatePicker dates={dates} setDates={setDates}/>
        <div className="flex  flex-1 px-7">
          <div className="w-1/2max-w-xl lg:max-w-2xl">
            <label htmlFor="search" className="sr-only">
              Search Invoice
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  id="search"
                  name="search"
                  className="block w-full rounded-md border border-transparent bg-white py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
                  placeholder="Search Invoice"
                  type="search"
                />
                <input type="submit" hidden />
              </form>
            </div>
          </div>
        </div>
        <Dropdown
        label="Sort"
        options={sortBy}
        selectedValue={sortByOption}
        onChange={setSortByOption}
        className='ml-10'
        />
        <Dropdown
        label="Order Status"
        options={sortOptions}
        selectedValue={statusFilter}
        onChange={setstatusFilter}
        className='ml-auto'
        />
      </div>
      {usersCart.map((value) => (
         <div className='rounded-lg border mt-3 overflow-hidden bg-white'>
         <div className='bg-red-500 flex items-center justify-between'>
           <div className='flex items-center'>
             <ShoppingBagIcon className='h-9 w-9 py-1 pl-3 text-red-50'/>
             <p className='text-white mx-3'><span className='text-yellow-300'>{convertToDate(value.date)}</span> || <span className=''>INV/</span>{value.invoice}  </p>
           </div>
           <p className='mr-3 text-yellow-300 font-semibold'>Status: <span className='text-white'>{value.status}</span></p>
         </div>
 
         <div  className=' flex items-center relative'>
           <div className='rounded-lg overflow-hidden my-4 mx-2'>
             <img className="" 
             src={value.Transaction_Details[0].Product.image_url}
             style={{ width: '8rem', height: '8rem' }}>    
             </img>
           </div>
           <div className=''>
             <p className='font-bold text-xl mb-2'>{value.Transaction_Details[0].product_name}</p>
             <p className='mb-2'>{value.Transaction_Details[0].qty} X {numToIDRCurrency(value.Transaction_Details[0].Product.price)}</p>
             {console.log("ini bingung",value)}
             {value.Transaction_Details.length > 1 ? <p className='mb-2'>+{(value.Transaction_Details.length) -1} other products</p>
             : null}
             
           </div>
           <div className='absolute right-3 font-bold'>
             Total Belanja
             <p>{numToIDRCurrency(value.total_price)}</p>
           </div>
         </div>
 
         <div className='flex items-center relative'>
           <button className='rounded-lg bg-red-500 m-3 py-2 text-white px-5 text-center hover:bg-red-600 hover:text-white transition-all duration-300'>Upload Payment</button>
           <button className='rounded-lg outline outline-2 outline-red-500 m-3 p-2 text-red-500 px-5 text-center hover:bg-slate-200 transition-all duration-300'>Cancle Order</button>
         </div>
         
       </div>
      ))}
     <Pagination
         itemsInPage={usersCart.length}
         itemsPerPage={3} 
         totalItems={count} 
         totalPages={Math.ceil(count / 3)}
         currentPage={currentPage}
         setCurrentPage={setCurrentPage}
         />
    </div>
    </div>
    
  );
}

export default OrderList;
