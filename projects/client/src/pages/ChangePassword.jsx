import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { successAlert, errorAlertWithMessage } from "../helper/alerts";
import api from "../api/api";

const ChangePassword = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const OnChangePass = async (e) => {
    e.preventDefault();
    try {
      const data = {
        old_pass: oldPassword,
        new_pass: newPassword,
        confirm_pass: confirmPassword,
      };

      const response = await api.put(`/changepassword/${user.id}`, data);

      successAlert(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      errorAlertWithMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/">
          <img
            className="mx-auto h-12 w-auto"
            src={logo}
            alt="Your Company"
          />
        </Link>
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
                htmlFor="old_pass"
                className="block text-sm font-medium text-gray-700"
              >
                Old password
              </label>
              <div className="mt-1">
                <input
                  id="old_pass"
                  name="old_pass"
                  type="password"
                  autoComplete="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
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
                  name="new_pass"
                  type="password"
                  autoComplete="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm new password
              </label>
              <div className="mt-1">
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  autoComplete="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
