import React from "react";

import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../reducers/userSlice";
import axios from "axios";
import Swal from "sweetalert2";

const url = "http://localhost:2000/auth/login";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const OnLogin = async () => {
    console.log("onLogin");
    const data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    try {
      const result = await axios.post(url, data);
      localStorage.setItem("token", result.data.result.token.token);

      //akan menerima token saat login
      console.log("resultData", result.data.result.user.name);
      const user = result.data.result.user;
      dispatch(
        login(
          user
          // id: result.data.result.user.id,
          // branch_id: result.data.result.user.branch_id,
          // username: result.data.result.user.username,
          // name: result.data.result.user.name,
          // email: result.data.result.user.email,
          // phone_num: result.data.result.user.phone_num,
          // gender: result.data.result.user.gender,
          // birthdate: result.data.result.user.birthdate,
          // profile_picture: result.data.result.user.profile_picture,
          // role: result.data.result.user.role,
        )
      );

      //untuk mereset form
      // document.getElementById("email").value = "";
      // document.getElementById("password").value = "";

      Swal.fire({
        icon: "Login",
        title: result.data.message,
        showConfirmButton: false,
        timer: 1500,
      });

      //setelah menerima token akan di navigate ke home
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "username or password does not exist",
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
              Sign in to your account
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
          {/* <form
          // className="mt-8 space-y-6 w-72"
        
          > */}
          {/* <input
            type="hidden"
            name="remember"
            defaultValue="true"
          /> */}
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
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
              <label htmlFor="password" className="sr-only">
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
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div> */}
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent  bg-red-800 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => {
                OnLogin();
              }}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </>
  );
};

export default Login;
