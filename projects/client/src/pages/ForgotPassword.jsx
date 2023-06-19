import React from "react";

const ForgotPassword = () => {
  const onResetPass = (e) => {
    e.preventDefault();

    const data = {
      email: document.getElementById("email".value).value,
    };
  };

  return (
    <div className="">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Reset password
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Enter your email and we'll send you a link to get back into your
              account.
            </p>
          </div>
          <form className="mt-5 sm:flex sm:items-center">
            <div className="w-full sm:max-w-xs">
              <label
                htmlFor="email"
                className="sr-only"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
