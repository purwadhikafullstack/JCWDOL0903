import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { errorAlertWithMessage, successAlert } from "../helper/alerts";
import FriendsImg from "../assets/friends.png";
import { checkUserReferralVoucher } from "../helper/voucher";

export default function ReferralCode() {
  const navigate = useNavigate();
  const userGlobal = useSelector((state) => state.user);

  useEffect(() => {
    checkUserReferralVoucher(userGlobal.id)
      .then((userHasReferralVoucher) => {
        if (
          userHasReferralVoucher ||
          userGlobal.role === "admin" ||
          userGlobal.role === "superadmin"
        )
          navigate("/");
      })
      .catch(() => navigate("/login"));
  }, [navigate, userGlobal.id, userGlobal.role]);

  function handleSubmit(e) {
    e.preventDefault();
    api
      .post("/user-vouchers", { referral_code: e.target.referralCode?.value })
      .then(() => {
        successAlert("Success");
        e.target.referralCode.value = "";
      })
      .catch((err) => errorAlertWithMessage(err.response.data.error));
  }

  return (
    <div className="container-screen py-16 sm:py-24">
      <div className="sm:flex sm:gap-4 sm:items-center">
        <div className="w-full">
          <img src={FriendsImg} alt="a group of people" className="w-full" />
        </div>
        <div className="w-full mt-8 sm:w-3/4 sm:mt-0">
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">
            Enter referral code to get a free discount voucher
          </h1>
          <form className="mt-4" onSubmit={handleSubmit}>
            <label
              htmlFor="referralCode"
              className="block text-sm font-medium text-gray-700"
            >
              Referral Code
            </label>
            <div>
              <input
                type="text"
                name="referralCode"
                id="referralCode"
                className="block w-full max-w-[500px] min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
              />
              <button className=" text-white rounded-md mt-2 bg-red-500 py-3 px-6 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                Redeem
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
