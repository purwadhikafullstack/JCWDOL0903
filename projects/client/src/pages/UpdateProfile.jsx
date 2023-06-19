import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";

const initialTabs = [
  { name: "My Account", href: "#", current: true },
  { name: "Address", href: "#", current: false },
  { name: "Payment", href: "#", current: false },
  { name: "Voucher", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UpdateProfile() {
  const [tabs, setTabs] = useState(initialTabs);
  const [name, setName] = useState("");

  // useEffect(() => {
  //   const newName = await axios.get("http://localhost:2000/user")
  // })

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
        <label
          htmlFor="tabs"
          className="sr-only"
        >
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
            className="-mb-px flex space-x-8"
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
                aria-current={tab.current ? "page" : undefined}
                onClick={() => handleTabClick(tab.name)}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {tabs.find((tab) => tab.current && tab.name === "My Account") && (
        <div className="mt-4 p-4 border border-gray-300 flex flex-col items-center ">
          {/* Your login box component */}
          <div className="flex-row">
            <h2 className="text-left font-black text-xl text-red-800">
              Update Profile
            </h2>
          </div>

          <div className="mt-4 p-4 border bg-white  flex flex-row items-center w-3/4 rounded-lg drop-shadow-md">
            <div className="w-1/2 border-r-4">
              <div className="space-y-4">
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    className="rounded-lg object-cover shadow-lg w-3/4"
                    src="https://images.pexels.com/photos/341013/pexels-photo-341013.jpeg"
                    alt="gambar"
                  />
                </div>
                <div>
                  <button className="rounded-lg w-3/4 h-12 bg-red-500 text-white hover:bg-red-600 active:bg-red-900">
                    Change Profile
                  </button>
                  <h1 className="w-3/4 mt-4 text-gray-600">
                    Besar file: maksimum 10.000.000 bytes (10 Megabytes).
                    Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
                  </h1>

                  <div>
                    <Link to={"/changePass/:id"}>
                      <button className="rounded-lg w-3/4 h-12 bg-slate-400 text-white hover:bg-slate-600 active:bg-slate-900">
                        Change Password
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-3">
              <h1 className="text-gray-500 font-medium text-xl underline">
                Update Biodata
              </h1>
              <p className="my-3 ml-3">
                Name<span className="ml-20">Christian Tanaka</span>{" "}
                <span className="ml-3">
                  <button className="text-blue-300">Change</button>
                </span>
              </p>

              <p className="my-3 ml-3">
                Birthdate<span className="ml-14">1999-12-25</span>{" "}
                <span className="ml-3">
                  <button className="text-blue-300">Change</button>
                </span>
              </p>

              <p className="my-3 ml-3">
                Gender<span className="ml-16 pl-2">Pria</span>{" "}
                <span className="ml-3">
                  <button className="text-blue-300">Change</button>
                </span>
              </p>

              <h2 className="mt-10 text-gray-500 font-medium text-xl underline">
                Update Contact
              </h2>

              <p className="my-3 ml-3">
                Email<span className="ml-20 pl-2">tanakaalden@gmail.com</span>{" "}
                <span className="ml-3">
                  <button className="text-blue-300">Change</button>
                </span>
              </p>

              <p className="my-3 ml-3">
                Phone<span className="ml-20">085778080063</span>{" "}
                <span className="ml-3">
                  <button className="text-blue-300">Change</button>
                </span>
              </p>
            </div>
          </div>
          <form>{/* Form fields */}</form>
        </div>
      )}
      {tabs.find((tab) => tab.current && tab.name === "Address") && (
        <div className="mt-4 p-4 border border-gray-300">
          {/* Your address box component */}
          <h2>Address Box</h2>
          <form>{/* Form fields */}</form>
        </div>
      )}
    </div>
  );
}
