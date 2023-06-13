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
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            start your 14-day free trial
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700"
            ></label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="name"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            ></label>
            <div className="mt-1">
              <input
                id="username"
                name="email"
                type="text"
                autoComplete="email"
                placeholder="username"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            ></label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="sr-only block text-sm font-medium text-gray-700"
            ></label>
            <div className="mt-1 ">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="password"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="sr-only block text-sm font-medium text-gray-700"
            ></label>
            <div className="mt-1">
              <input
                id="confirmation"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="password confirmation"
                required
                className=" relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            ></label>
            <div className="mt-1">
              <input
                id="phone_num"
                name="text"
                type="text"
                autoComplete="password"
                placeholder="phone number"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* pemisah */}

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

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => {
                onRegister();
              }}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
