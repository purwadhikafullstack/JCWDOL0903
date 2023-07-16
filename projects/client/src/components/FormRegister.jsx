import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useFormikValidation } from "../helper/formik";

export default function FormRegister({ onRegister }) {
  const formik = useFormikValidation(onRegister);

  // console.log("formik", formik);
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
          Join Bangunin
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Have an account already?{" "}
          <Link
            to={"/login"}
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            Log in
          </Link>
        </p>
      </div>

      <form
        className="space-y-6"
        onSubmit={formik.handleSubmit}
      >
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <div className="text-orange-500">{formik.errors.name}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <div className="text-orange-500">{formik.errors.username}</div>
              )}
            </div>

            <div className="flex w-full gap-2">
              <div className="grow">
                <label
                  htmlFor="birthdate"
                  className="block text-sm font-medium"
                >
                  Birthdate
                </label>
                <div className="mt-1">
                  <input
                    id="birthdate"
                    name="birthdate"
                    type="date"
                    autoComplete="bday"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.birthdate}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                  />
                </div>
                {formik.touched.birthdate && formik.errors.birthdate && (
                  <div className="text-orange-500">
                    {formik.errors.birthdate}
                  </div>
                )}
              </div>

              <div className="grow">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium"
                >
                  Gender
                </label>
                <div className="mt-1">
                  <select
                    id="gender"
                    name="gender"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="Pria">Male</option>
                    <option value="Wanita">Female</option>
                  </select>
                </div>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="text-orange-500">{formik.errors.gender}</div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="tel"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-orange-500">{formik.errors.phone}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className="text-orange-500">{formik.errors.email}</div>
              )}
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
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500">{formik.errors.password}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmation"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmation"
                  name="confirmation"
                  type="password"
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmation}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                />
              </div>
              {formik.touched.confirmation && formik.errors.confirmation && (
                <div className="text-red-500">{formik.errors.confirmation}</div>
              )}
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
                <a
                  href="#"
                  className="font-medium text-orange-800 hover:text-black"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
