import React from "react";

import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../reducers/userSlice";
import api from "../api/api";
import Swal from "sweetalert2";
import { successAlert, errorAlertWithMessage } from "../helper/alerts";
import logo from "../assets/logo.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const OnLogin = async (e) => {
    e.preventDefault();
    const data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    try {
      const result = await api.post("/auth/login", data);

      localStorage.setItem("token", result.data.result.token.token);

      //akan menerima token saat login
      const user = result.data.result.user;
      dispatch(login(user));

      //untuk mereset form
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";

      successAlert(result.data.message);

      //setelah menerima token akan di navigate ke home
      setTimeout(() => {
        if (user.role === "superadmin" || user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
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
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to Bangunin
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account??{" "}
          <Link
            to={"/register"}
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            Sign up
          </Link>
        </p>
      </div>
      <form
        className="space-y-6"
        onSubmit={OnLogin}
      >
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
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
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to={"/forgot-password"}
                  className="font-medium text-orange-600 hover:text-black"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
