import React from "react";
import logo from "../assets/logo.png";

const ReqForgotPass = () => {
  const onResetPass = (e) => {
    e.preventDefault();

    const data = {
      email: document.getElementById("email").value,
      confirm_pass: document.getElementById("confirm_password").value,
    };
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
          Reset Password Account Bangunin
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create a strong password for your account
        </p>
      </div>
      <form
        className="space-y-6"
        onSubmit={onResetPass}
      >
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
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
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReqForgotPass;
