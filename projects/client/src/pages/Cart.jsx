import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useSelector, useDispatch } from "react-redux";
import pattern from "../assets/pattern.jpg";
import { numToIDRCurrency } from "../helper/currency";
import WarningModal from "../components/subcomponents/WarningModal";
import { fetchUserCart } from "../reducers/cartSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const generateCart = async () => {
    const cartResponse = await api.get("/cart/" + user.id);
    console.log("inicarfrontend", cartResponse);
    setCart(cartResponse.data.cart);
    dispatch(fetchUserCart(user.id));
  };

  const addOne = async (productId, userId) => {
    await api.post("/cart/", { product_id: productId, user_id: userId });
    generateCart();
    dispatch(fetchUserCart(user.id));
  };

  const deleteOne = async (productId) => {
    await api.delete("/cart/" + user.id, { data: { product_id: productId } });
    generateCart();
    dispatch(fetchUserCart(user.id));
  };

  useEffect(() => {
    if (!user.id || user.role === "user") navigate("/");
    generateCart();
  }, [navigate, user.id, user.role]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((value) => {
      totalPrice += value.Product.price * value.qty;
    });
    return totalPrice;
  };

  return (
    <div
      className="bg-white"
      style={{
        backgroundImage: `url(${pattern})`,
        backgroundRepeat: "repeat",
        backgroundSize: "20rem 20rem",
      }}
    >
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-red-500 sm:text-4xl">
          Shopping Cart
        </h1>
        <form
          className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
          onSubmit={(event) => event.preventDefault()}
        >
          <section
            aria-labelledby="cart-heading"
            className="lg:col-span-7"
          >
            <h2
              id="cart-heading"
              className="sr-only"
            >
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-t border-b border-gray-200"
            >
              {cart.map((value) => (
                <li
                  key={value.id}
                  className="flex py-6 bg-white sm:py-10"
                >
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
                            <a
                              href={null}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {value.Product.name}
                            </a>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {value.Product.name}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {numToIDRCurrency(value.Product.price)}
                        </p>
                      </div>

                      <div className="flex flex-row mt-4 sm:mt-0 sm:pr-9">
                        <div>
                          <button
                            className="mx-3"
                            type="button"
                            onClick={() => deleteOne(value.product_id)}
                          >
                            <MinusCircleIcon className="h-6 w-6 text-red-500 hover:text-red-700" />
                          </button>
                        </div>
                        <div className="mx-3">{value.qty}</div>
                        <div>
                          <button
                            type="button"
                            className="mx-3"
                            onClick={() =>
                              addOne(value.product_id, value.user_id)
                            }
                          >
                            <PlusCircleIcon className="h-6 w-6 text-green-500 hover:text-green-600" />
                          </button>
                        </div>

                        <div className="absolute top-0 right-0">
                          <button
                            type="button"
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <WarningModal
                              user={user.id}
                              productId={value.product_id}
                              generateCart={generateCart}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Total Price</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {numToIDRCurrency(calculateTotalPrice())}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  {numToIDRCurrency(calculateTotalPrice())}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <Link
                to={"/cart/checkout"}
                className="w-full rounded-md border border-transparent bg-yellow-400 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </Link>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
