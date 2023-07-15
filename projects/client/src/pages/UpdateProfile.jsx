import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import iconLogo from "../assets/logo.png";
import api from "../api/api";
import pattern from "../assets/pattern.jpg";
import Address from "../components/Address";
import PopModel from "../components/subcomponents/PopModel";
import DefaultAvatar from "../assets/default-avatar.jpg";

const initialTabs = [
  { name: "My Account", current: true },
  { name: "My Address", current: false },
  { name: "Payment", current: false },
  { name: "Voucher", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UpdateProfile() {
  const [address, setAddress] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tabs, setTabs] = useState(initialTabs);
  const user = useSelector((state) => state.user);
  const [page, setPage] = useState(true);
  async function fetchAddress() {
    try {
      const address = await api.get("/profile/address/" + user.id);
      console.log(address);
      setAddress(address.data.data);
    } catch (err) {
      console.log(err);
    }
  }
  // const date = new Date(user.birthdate);
  // const formattedDate = date.toISOString().split("T")[0];
  // console.log("ini date di updatea", formattedDate);

  const handleChangePass = () => {
    navigate("/change-password");
  };

  const changePage = () => {
    setPage(!page);
  };

  const handleTabClick = (name) => {
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      current: tab.name === name,
    }));
    setTabs(updatedTabs);
  };

  const onUpdate = async () => {
    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      gender: document.getElementById("gender").value,
      birthdate: document.getElementById("birthdate").value,
      profile_picture: document.getElementById("profile_picture").files[0],
    };

    const userEdit = new FormData();
    userEdit.append("name", data.name);
    userEdit.append("email", data.email);
    userEdit.append("gender", data.gender);
    userEdit.append("birthdate", data.birthdate);
    userEdit.append("profile_picture", data.profile_picture);

    try {
      const result = await api.post("/profile/update/" + user.id, userEdit);
      await Swal.fire({
        icon: "success",
        title: result.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
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
        <div
          className="flex flex-col items-center"
          style={{
            backgroundImage: `url(${pattern})`,
            backgroundRepeat: "repeat",
            backgroundSize: "20rem 20rem",
          }}
        >
          {/* Your login box component */}
          <div className="flex-row">
            <h2 className="text-left font-black text-xl my-3 text-red-800">
              Users Profile
            </h2>
          </div>

          {page ? (
            <div className="mt-4 p-4 border bg-white  flex flex-row items-center w-3/4 rounded-lg drop-shadow-md">
              <div className="w-1/2 border-r-4">
                <div className="space-y-4">
                  <div className="aspect-w-3 aspect-h-2">
                    <img
                      className="rounded-lg object-cover shadow-lg w-3/4"
                      src={
                        `http://localhost:2000/static/avatar/${user.profile_picture}` ||
                        DefaultAvatar
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = DefaultAvatar;
                      }}
                      alt="gambar"
                    />
                  </div>
                  <div>
                    <button
                      className="rounded-lg w-3/4 h-12 bg-red-500 text-white hover:bg-red-600 active:bg-red-900"
                      onClick={changePage}
                    >
                      Change Profile
                    </button>
                    <h1 className="w-3/4 mt-4 text-gray-600">
                      Maximum file size: 10,000,000 bytes (10 Megabytes).
                      Allowed file extensions: .JPG, .JPEG, .PNG.
                    </h1>
                  </div>
                  <div>
                    <button
                      className="rounded-lg w-3/4 h-12 bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-900"
                      onClick={handleChangePass}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-gray-500 font-medium text-xl underline">
                  Update Biodata
                </h1>
                <p className="my-3 ml-3">
                  Name<span className="ml-20">{user.name}</span>{" "}
                </p>

                <p className="my-3 ml-3">
                  Birthdate<span className="ml-14">{user.birthdate}</span>{" "}
                </p>

                <p className="my-3 ml-3">
                  Gender<span className="ml-16 pl-2">{user.gender}</span>{" "}
                </p>

                <h2 className="mt-10 text-gray-500 font-medium text-xl underline">
                  Update Contact
                </h2>

                <p className="my-3 ml-3">
                  Email<span className="ml-20 pl-2">{user.email}</span>{" "}
                </p>

                <p className="my-3 ml-3">
                  Phone<span className="ml-20">{user.phone_num}</span>{" "}
                </p>

                {user.role === "user" && (
                  <>
                    <h2 className="mt-10 text-gray-500 font-medium text-xl underline">
                      Referral Code
                    </h2>
                    <p className="my-3 ml-3">
                      Referral code
                      <span className="ml-8">{user.referral_code}</span>{" "}
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col min-h-full bg-white mb-8 justify-center py-12 sm:px-6 lg:px-8 w-1/2 border-2 rounded-lg shadow">
              <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
                <img
                  className="mx-auto h-12 w-auto"
                  src={iconLogo}
                  alt="Your Company"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Update your profile
                </h2>
              </div>

              <form
                method="post"
                encType="multipart/form-data"
                className="flex flex-col"
              >
                <label for="name">Name:</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="name"
                  className="rounded-lg my-3"
                />
                <label for="email">Email:</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email"
                  className="rounded-lg my-3"
                />
                <label for="gender">Gender:</label>
                <select
                  id="gender"
                  name="gender"
                  className="rounded-lg my-3"
                >
                  <option
                    value=""
                    disabled
                    selected
                    hidden
                  >
                    Choose your gender
                  </option>
                  <option value="Pria">Pria</option>
                  <option value="Wanita">Wanita</option>
                </select>
                <label for="birthdate">Birthdate:</label>
                <input
                  id="birthdate"
                  name="birthdate"
                  type="text"
                  placeholder="birthdate"
                  className="rounded-lg my-3"
                />
                <label
                  for="profile_picture"
                  className="mb-3"
                >
                  Profile Picture:
                </label>
                <input
                  id="profile_picture"
                  name="profile_picture"
                  type="file"
                />
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={(e) => {
                        e.preventDefault();
                        onUpdate();
                        changePage();
                      }}
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
      {tabs.find((tab) => tab.current && tab.name === "My Address") && (
        <div
          className="container-screen flex flex-col justify-center items-center"
          style={{
            backgroundImage: `url(${pattern})`,
            backgroundRepeat: "repeat",
            backgroundSize: "20rem 20rem",
          }}
        >
          {/* Your address box component */}
          <Address {...{ fetchAddress, setAddress, address }} />
          <PopModel {...{ fetchAddress, setAddress, address }} />
        </div>
      )}
    </div>
  );
}
