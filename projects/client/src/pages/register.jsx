import { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { LockClosedIcon } from "@heroicons/react/20/solid";

const Register = () => {
  // const LoginSchema = Yup.object().shape({
  //   email: Yup.string()
  //     .email("Format email salah")
  //     .required("Email tidak boleh kosong"),
  //   password: Yup.string()
  //     .min(3, "Password harus lebih dari 3 character")
  //     .required("Password tidak boleh kosong"),
  // });

  const navigate = useNavigate();
  // const [showPassword, setPassword] = useState(false);

  const onRegister = async () => {
    console.log("onRegister");
    const data = {
      name: document.getElementById("name").value,
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      password_confirmation: document.getElementById("confirmation").value,
      phone_num: document.getElementById("phone_num").value,
    };
    try {
      const url = "http://localhost:2000/auth/register";
      const result = await axios.post(url, data);

      console.log(url);
      console.log(result);

      //untuk mereset kembali form
      // document.getElementById("name").value = "";
      // document.getElementById("username").value = "";
      // document.getElementById("email").value = "";
      // document.getElementById("password").value = "";
      // document.getElementById("confirmation").value = "";
      // document.getElementById("phone_num").value = "";

      await Swal.fire({
        icon: "success",
        title: result.data.message,
        showConfirmButton: false,
        timer: 1500,
      });

      // navigate("/login");
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
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 flex flex-col items-center">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Register
            </h2>
            {/* <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                start your 14-day free trial
              </a>
            </p> */}
          </div>
          {/* <form className="mt-8 space-y-6 w-72"> */}
          <input
            type="hidden"
            name="remember"
            defaultValue="true"
          />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label
                htmlFor="name"
                className="sr-only"
              >
                Email address
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="text"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="sr-only"
              >
                Email address
              </label>
              <input
                id="username"
                name="name"
                type="text"
                autoComplete="text"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="username"
              />
            </div>

            <div>
              <label
                htmlFor="email-address"
                className="sr-only"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="sr-only"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label
                htmlFor="password-confirmation"
                className="sr-only"
              >
                Password
              </label>
              <input
                id="confirmation"
                name="password-confirmation"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password confirmation"
              />
            </div>
            <div>
              <label
                htmlFor="phone-number"
                className="sr-only"
              >
                Phone
              </label>
              <input
                id="phone_num"
                name="name"
                type="text"
                autoComplete="text"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Phone number"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            {/* <div className="text-sm">
              <a
                // href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div> */}
          </div>

          <div>
            <button
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-red-800 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => {
                onRegister();
              }}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign up
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </>
  );
};

export default Register;
