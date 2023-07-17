import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import { useSelector, useDispatch } from 'react-redux'
import pattern from "../assets/pattern.jpg"
import { numToIDRCurrency } from '../helper/currency'
import { fetchUserCart } from "../reducers/cartSlice";
import { fetchVouchers } from '../reducers/voucherSlice'
import Swal from "sweetalert2";
import { generateInvoiceNumber } from '../helper/invoice'


export default function Checkout() {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [address, setAddress] = useState({})
  const [cityRaja, setCityRaja] = useState([])
  const [cityId, setCityId] = useState("")
  const [origin, setOrigin] = useState("")
  const [originId, setOriginId] = useState("")
  const [ongkir, setOngkir] = useState([])
  const [selectedShippingOption, setSelectedShippingOption] = useState("0");
  const [voucher, setVoucher] = useState([])
  const [discountVoucher, setDiscountVoucher] = useState(0)
  const user = useSelector((state) => state.user)
  const voucherGlobal = useSelector((state) => state.voucher)
  const branchGlobal = useSelector((state) => state.branch);
  const dispatch = useDispatch();

  const generateCart = async () => {
    const cart = await api.get("/cart/"+user.id+`/${branchGlobal.selectedBranch.id}`)
    setCart(cart.data.cart)
    dispatch(fetchUserCart(user.id)); 
  }

  const getUserMainAddress = async () => {
    const result = await api.get("/profile/mainaddress/" + user.id)
    setAddress(result.data.data)
  }

  const getRajaOngkirCity = async () => {
    const result = await api.post("/city/rajaongkir", {
      headers : {
        key: process.env.REACT_APP_RAJA_ONGKIR_API_KEY
      }
    })
    setCityRaja(result.data.data.rajaongkir.results)
  }
  
  useEffect(() => {
    generateCart()
    getUserMainAddress()   
    getRajaOngkirCity()
    discountVouchers()
  },[selectedShippingOption])

  useEffect(() => {
    dispatch(fetchVouchers())
    setVoucher(voucherGlobal.vouchers)
  },[dispatch])

  
  useEffect(() => {
    if (cart.length > 0) {
      setOrigin(cart[0].Product.Stocks[0].Branch.kota)
    }
  }, [cart])


  useEffect(() => {
    if (address) {
      const findDestination = cityRaja.find((val) => val.city_name === address.kota);
    if (findDestination) {
      const city_id = findDestination.city_id;
      setCityId(city_id);
    } else {
      // console.log("Kota destination tidak ditemukan dalam data.");
    }

    const findOrigin = cityRaja.find((val) => val.city_name === origin);
    if (findOrigin) {
      const city_id = findOrigin.city_id;
      setOriginId(city_id);
    } else {
      // console.log("Kota origin tidak ditemukan dalam data.");
    }
    }
    
  }, [address, cityRaja, origin]);

  useEffect(() => {
    const fetchOngkir = async () => {
      try {
        if (cityId && originId) {
          const payload = {
            origin: cityId,
            destination: originId,
            weight: 1700,
            courier: 'jne'
          };
    
          const response = await api.post('/ongkir', payload, {
            headers: {
              key: process.env.REACT_APP_RAJA_ONGKIR_API_KEY
            }
          });
          setOngkir(response.data.rajaongkir.results[0].costs)
        }
      } catch (error) {
        // console.log("Error fetching city data:", error);
      }
    };
  
    fetchOngkir();
  }, [cityId, originId]);
  

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((value) => {
      totalPrice += value.Product.price * value.qty;
    });
    return totalPrice;
  };

  const onAddAddress = () => {
    navigate("/user/settings")
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedShippingOption === "0") {
        Swal.fire({
          icon: "error",
          title: "Please choose a shipping service",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const createTransactionResponse = await api.post(
          "/transaction/create_transaction/" + user.id,
          {
            cart,
            selectedShippingOption,
            branch_id: cart[0].Product.Stocks[0].Branch.id,
            invoice: generateInvoiceNumber()
          }
        );
  
        if (createTransactionResponse.status === 200) {
          await Promise.all(
            cart.map(async (cartItem) => {
              await api.delete("/cart/item/" + user.id, {
                data: { product_id: cartItem.product_id },
              });
            })
          );
  
          dispatch(fetchUserCart(user.id));
  
          await Swal.fire({
            icon: "success",
            title: createTransactionResponse.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/order_list");
        } else {
          throw new Error("Transaction creation failed");
        }
      }
    } catch (error) {
      console.log("error", error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  
  

  const voucherTotalBelanja = voucher.filter((value) => (
    value.voucher_type === "Total Belanja"
  ))

  const totalPrice = calculateTotalPrice()
  const totalPriceWithShipping = totalPrice + (selectedShippingOption ? parseInt(selectedShippingOption) - discountVoucher : 0);
  
  const discountVouchers = () => {
    let totalDiscount = 0;
    
    cart.forEach((value) => {
      if (value.Product.Vouchers && value.Product.Vouchers.length > 0) {
        const voucher = value.Product.Vouchers[0];
        
        if (voucher.amount) {
          totalDiscount += voucher.amount;
        } else if (voucher.percentage) {
          const discountAmount = (value.Product.price * value.qty) * voucher.percentage;
          
          if (discountAmount > voucher.limit) {
            totalDiscount += voucher.limit;
          } else {
            totalDiscount += discountAmount;
          }
        }
      }
    });
  
    setDiscountVoucher(totalDiscount);
  };
  
  return (
    <div className="bg-white" style={{ backgroundImage: `url(${pattern})`, backgroundRepeat: 'repeat', backgroundSize: '20rem 20rem'}}>
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-red-500 sm:text-4xl">Checkout</h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16" onSubmit={event => event.preventDefault()}>
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
          {address ? (
             <div  className="py-3">
             <div className="grid grid-cols-2 w-full">
               <div>
                 <h1 className="mb-3">
                   <span className="text-xl font-semibold border-b-2">Shipping Address</span>
                 </h1>
                 <p><span className="font-medium mr-3 text-slate-600">Kota:</span>{address.kota}</p>
                 <p><span className="font-medium mr-3 text-slate-600">Provinsi:</span>{address.provinsi}</p>
                 <p><span className="font-medium mr-3 text-slate-600">Kecamatan:</span>{address.kecamatan}</p>
                 <p><span className="font-medium mr-3 text-slate-600">Kode Pos:</span>{address.kode_pos}</p>
               </div>
               <div className="flex justify-end items-center">
                 <p className="text-center font-medium text-slate-400 mr-2">Main Address</p>              
               </div>
             </div>
           </div>
          ) : (
            <div className='font-bold rounded-lg p-2 border-dashed border-2'>
              You Haven't Registered Any Addresses Yet.
              <div>
                <button 
                className='text-white bg-red-500 hover:bg-red-700 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center my-5'
                onClick={() => onAddAddress()}
                >Add Address</button>
              </div>
            </div>
          )}
           

            <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200 mt-3">
              {cart.map((value) => (
                <li key={value.id} className="flex py-6 bg-white sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={`${process.env.REACT_APP_PRODUCT_IMG_BASE_URL}/${value.Product.image_url}`}
                      alt={`${value.Product.name} image`}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a href={null} className="font-medium text-gray-700 hover:text-gray-800">
                              {null}
                            </a>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">{value.Product.name}</p>
                        <p className="mt-1 text-sm  text-gray-900 font-semibold">Total: </p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{numToIDRCurrency(value.Product.price*value.qty)}</p>
                      </div>

                      <div className="flex flex-row mt-4 sm:mt-0 sm:pr-9">
                       <div className='mx-3'>
                           {value.qty} {value.qty > 1? (<span>Items</span>) : (<span>Item</span>) }
                       </div>                                          
                      </div>
                      
                    </div>
                    <p>From branch: {value.Product.Stocks[0].Branch.kota}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          {/* Order summary */}
          {address? (
            <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Total Price</dt>
                <dd className="text-sm font-medium text-gray-900">{numToIDRCurrency(calculateTotalPrice())}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Courier</dt>
                <dd className="text-sm font-medium text-gray-900" id='jne'>Jalur Nugraha Ekakurir (JNE)</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Service</dt>
                <dd className="text-sm font-medium text-gray-900" id='jne'>
                <select
                className="block w-full appearance-none rounded-md border border-gray-300 pl-3 pr-8 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                onChange={(e) => setSelectedShippingOption(e.target.value)}
                value={selectedShippingOption}
              >    <option value={0}> 
                      Duration
                    </option>
                  {ongkir.map((value) => (
                    <option key={value.service} value={value.cost[0].value} >
                      {value.service} | {numToIDRCurrency(value.cost[0].value)} est. {value.cost[0].etd} days                    
                    </option>
                  ))}
                </select>                 
                </dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Product Discount</dt>
                <dd className="text-sm font-medium text-gray-900" >
                    - {numToIDRCurrency(discountVoucher)}
                </dd>
              </div>
                  
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Users Voucher</dt>
                <dd className="text-sm font-medium text-gray-900">
                <select className="block w-full appearance-none rounded-md border border-gray-300 pl-3 pr-8 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm">
                  {voucherTotalBelanja.map((value) => {
                    if (value.min_purchase <= totalPriceWithShipping) {
                      return <option key={value.id} value={value.amount}>- {numToIDRCurrency(value.amount)}</option>;
                    }
                    return <option key={value.id} value={value.amount}>No voucher available</option>;
                  })}
                </select>
                </dd>
              </div>
              

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">{numToIDRCurrency(totalPriceWithShipping)}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button to="/order_list" type="submit" onClick={onSubmit}
                className="w-full rounded-md border border-transparent bg-yellow-400 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 text-center">
                Checkout
              </button>             
            </div>
          </section>
          ) : (
            <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Total Price</dt>
                <dd className="text-sm font-medium text-gray-900">{numToIDRCurrency(calculateTotalPrice())}</dd>
              </div>
                      
            </dl>
          </section>
          )}
          
        </form>
      </div>
    </div>
  )
}