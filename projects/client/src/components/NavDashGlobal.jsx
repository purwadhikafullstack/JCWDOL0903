import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import iconLogo from "../assets/logo.png";
import api from "../api/api";
import pattern from "../assets/pattern.jpg";
import Address from "../components/Address";
import PopModel from "../components/subcomponents/PopModel";
import WaitingForPayment from "./subcomponents/TransactionWaitingForPayment"
import WaitingForConfirm from "./subcomponents/TransactionWaitingForConfirmation"
import WaitingForDelivery from "./subcomponents/TransactionWaitingForDelivery"
import OnDelivery from "./subcomponents/TransactionOnDelivery"
import OrderDone from "./subcomponents/TransactionDone"
import OrderCanceled from "./subcomponents/TransactionCanceled"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavDashGlobal({init}) {
  const [address, setAddress] = useState([]);
  const [tabs, setTabs] = useState(init);
  const user = useSelector((state) => state.user);
  const [page, setPage] = useState(true);
  async function fetchAddress() {
    try {
      const address = await api.get("/profile/address/" + user.id);
      setAddress(address.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleTabClick = (name) => {
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      current: tab.name === name,
    }));
    setTabs(updatedTabs);
  };


  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-red-800 focus:outline-none focus:ring-red-800 sm:text-sm"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav
            className="-mb-px flex space-x-8 container-screen"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={classNames(
                  tab.current
                    ? "border-red-800 text-red-800"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                )}
                onClick={() => handleTabClick(tab.name)}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {tabs.find((tab) => tab.current && tab.name === "Waiting for Payment") && (
        <div
          className="flex flex-col justify-center items-center mx-10"
        >
          <WaitingForPayment/>
        </div>
      )}
      {tabs.find((tab) => tab.current && tab.name === "Waiting for Confirmation") && (
        <div
          className="flex flex-col justify-center items-center mx-10"
        >
          <WaitingForConfirm/>
        </div>
      )}
      {tabs.find((tab) => tab.current && tab.name === "In Process") && (
        <div
          className="flex flex-col justify-center items-center mx-10"
        >
          <WaitingForDelivery/>
        </div>
      )}

      {tabs.find((tab) => tab.current && tab.name === "On Delivery") && (
        <div
          className="flex flex-col justify-center items-center mx-10"
        >
          <OnDelivery/>
        </div>
      )}

    {tabs.find((tab) => tab.current && tab.name === "Order Confirmed") && (
        <div
          className="flex flex-col justify-center items-center mx-10"
        >
          <OrderDone/>
        </div>
      )}

    {tabs.find((tab) => tab.current && tab.name === "Order Canceled") && (
        <div
          className="flex flex-col justify-center items-center mx-10"
        >
          <OrderCanceled/>
        </div>
      )}
    </div>
  );
}