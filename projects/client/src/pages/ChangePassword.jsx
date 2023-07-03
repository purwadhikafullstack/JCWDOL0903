import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Axios from "axios";
import { successAlert, errorAlertWithMessage } from "../helper/alerts";

const ChangePassword = () => {
  const navigate = useNavigate();
  // mengambil data dari reducer mengenunakan useSelector
  const user = useSelector((state) => state.user);

  // const dispatch = useDispatch();

  const OnChangePass = async (e) => {
    // cara ruuuning menggunakan enter
    e.preventDefault();

    // console.log(user);
    // console.log("onChanges");
    try {
      const data = {
        old_pass: document.getElementById("old_pass").value,
        new_pass: document.getElementById("new_pass").value,
        confirm_pass: document.getElementById("confirm_password").value,
      };
      // console.log("data", data);

      const url = await Axios.put(
        `http://localhost:2000/changepassword/${user.id}`,
        data
      );

      console.log("url", url);
      successAlert();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src={logo}
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
          Change Password Account Bangunin
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create a strong password for the account with {user.email}
        </p>
      </div>
      <form
        className="space-y-6"
        onSubmit={OnChangePass}
      >
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Old password
              </label>
              <div className="mt-1">
                <input
                  id="old_pass"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="new_pass"
                className="block text-sm font-medium text-gray-700"
              >
                New password
              </label>
              <div className="mt-1">
                <input
                  id="new_pass"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm new Password
              </label>
              <div className="mt-1">
                <input
                  id="confirm_password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Submit {user.id}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
