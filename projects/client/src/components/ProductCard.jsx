import ProductNotFound from "../components/ProductNotFound";
import { numToIDRCurrency } from "../helper/currency";
import api from "../api/api";
import { useSelector, useDispatch } from 'react-redux'
import Swal from "sweetalert2";
import { fetchUserCart } from "../reducers/cartSlice";

export default function ProductCard({ products = [] }) {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  if (!products.length) return <ProductNotFound />;
  
  const addOne = async(productId, userId) => {
    try{
      const result = await api.post("/cart/", { product_id: productId, user_id: userId} )
      await Swal.fire({
        icon: "success",
        title: result.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(fetchUserCart(user.id)); 
    }
    catch (error) {
      Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
  }   
  }

  return (
    <div className="mb-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <div key={product.id} className="shadow-md rounded-md border px-4">
          <div>
            <div className="relative h-72 w-full overflow-hidden rounded-lg">
              <img
                src={product.image_url}
                alt="product"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="relative mt-4">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {product.name}
              </h3>
            </div>
            <p className="relative text-lg font-semibold text-red-400 truncate">
              {numToIDRCurrency(product.price)}
            </p>
          </div>
          <div className="my-6">
            <button onClick={() => addOne(product.id, user.id)} className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200">
              Add to cart<span className="sr-only">, {product.name}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
