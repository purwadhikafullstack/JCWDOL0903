import { useState, useEffect } from "react";
import api from "../api/api";
import { numToIDRCurrency } from "../helper/currency";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CheckIcon,
  XMarkIcon,
  StarIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import ProductDetailSkeleton from "../components/ProductDetailSkeleton";
import ProductNotFound from "../components/ProductNotFound";
import InputNumber from "../components/InputNumber";
import BrokenImg from "../assets/broken-img.png";
import { errorAlert, errorAlertWithMessage } from "../helper/alerts";
import { fetchUserCart } from "../reducers/cartSlice";
import Swal from "sweetalert2";

export default function ProductDetail() {
  const branchesGlobal = useSelector((state) => state.branch);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  // console.log('')
  const [product, setProduct] = useState({});
  const productStock = product?.Stocks?.[0]?.stock || 0;
  const productBranch = product?.Stocks?.[0]?.Branch || {};
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const productId = useParams().id;

  const addOne = async (productId, userId) => {
    const response = await api.post("/cart/", { product_id: productId, user_id: userId });
    
    dispatch(fetchUserCart(user.id));

    await Swal.fire({
      icon: "success",
      title: response.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  useEffect(() => {
    setIsLoading(true);
    api
      .get(
        `/products?id=${productId}&&branchId=${branchesGlobal.selectedBranch.id}`
      )
      .then((res) => {
        setProduct(res.data.products?.rows[0]);
        setIsLoading(false);
      });
  }, [productId, branchesGlobal.selectedBranch.id]);

  function handleChange(e) {
    const input = e.target.value;
    setQuantity(input ? parseInt(input) : input);
  }

  function checkQuantity() {
    if (!quantity || quantity < 1) setQuantity(1);
    else if (quantity > productStock) setQuantity(productStock);
    else setQuantity(quantity);
  }

  function handleAdd() {
    setQuantity((q) => {
      if (q < productStock) return q + 1;
      else return q;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!user.id) errorAlertWithMessage("User is not register");
  }

  function handleSubtract() {
    setQuantity((q) => {
      if (q > 1) return q - 1;
      else return q;
    });
  }

  if (isLoading) {
    return (
      <div className="container-screen py-16 sm:py-24">
        {<ProductDetailSkeleton />}
      </div>
    );
  } else if (!product?.id) {
    return (
      <div className="container-screen py-16 sm:py-24">
        <ProductNotFound />
      </div>
    );
  }

  return (
    <div className="bg-white container-screen">
      <div className="py-16 sm:py-24 lg:grid lg:grid-cols-[2fr,2fr,1fr] lg:gap-x-12">
        <div className="mt-10 lg:mt-0">
          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
            <img
              src={
                `${process.env.REACT_APP_PRODUCT_IMG_BASE_URL}/${product.image_url}` ||
                BrokenImg
              }
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = BrokenImg;
              }}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div>
          <div className="mt-4 lg:mt-0">
            <div className="flex gap-2 flex-wrap">
              {product.Vouchers.map((v) => {
                return v.voucher_type === "Buy One Get One" ? (
                  <span
                    key={v.id}
                    className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-700"
                  >
                    Buy One Get One
                  </span>
                ) : v.voucher_type === "Produk" ? (
                  (v.amount || v.percentage) && (
                    <span
                      key={v.id}
                      className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-700"
                    >
                      Discount{" "}
                      {v.amount
                        ? numToIDRCurrency(v.amount)
                        : `${v.percentage}%`}
                    </span>
                  )
                ) : null;
              })}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>
          </div>
          <section
            aria-labelledby="information-heading"
            className="mt-4"
          >
            <h2
              id="information-heading"
              className="sr-only"
            >
              Product information
            </h2>
            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                {numToIDRCurrency(product.price)}
              </p>
              <div className="ml-4 border-l border-gray-300 pl-4">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className="text-yellow-400 h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{product.desc}</p>
            </div>
            {productStock ? (
              <div className="mt-6 flex items-center">
                <CheckIcon
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                  aria-hidden="true"
                />
                <p className="ml-2 text-sm text-gray-500">
                  In stock and ready to ship
                </p>
              </div>
            ) : (
              <div className="mt-6 flex items-center">
                <XMarkIcon
                  className="h-5 w-5 flex-shrink-0 text-red-500"
                  aria-hidden="true"
                />
                <p className="ml-2 text-sm text-gray-500">Out of stock</p>
              </div>
            )}
            <div className="grid grid-cols-[auto,1fr] items-center gap-x-2 w-max text-sm my-8">
              <MapPinIcon className="w-5 h-5 text-gray-400" />
              <p className="col-start-2">Branch Location</p>
              <p className="col-start-2 font-medium">{`${productBranch.kecamatan}, ${productBranch.kota}`}</p>
            </div>
          </section>
        </div>

        <div className="mt-10 lg:mt-0">
          <section aria-labelledby="options-heading">
            <h2
              id="options-heading"
              className="sr-only"
            >
              Product options
            </h2>
            <form onSubmit={handleSubmit}>
              <h3 className="font-bold text-xl border-b border-b-gray-200 mb-4 pb-2">
                Set quantity
              </h3>
              <div className="flex items-center gap-2">
                <InputNumber
                  onSubtract={handleSubtract}
                  disabledSubtract={quantity <= 1}
                  onAdd={handleAdd}
                  disabledAdd={quantity >= productStock}
                  inputValue={quantity}
                  onInputChange={handleChange}
                  onInputBlur={checkQuantity}
                />
                <p>Stock: {productStock}</p>
              </div>
              <div className="flex justify-between items-center mt-4 max-w-[200px]">
                <p>Subtotal</p>
                <p className="font-bold text-lg">
                  {quantity
                    ? numToIDRCurrency(product.price * quantity)
                    : numToIDRCurrency(product.price)}
                </p>
              </div>
              <div className="mt-10">
                <button
                  onClick={() => addOne(product.id, user.id)}
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-500 py-3 px-8 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={!productStock || !user.id}
                >
                  Add to cart
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
