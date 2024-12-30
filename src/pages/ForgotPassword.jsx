import { useState } from "react";
import authFetch from "../components/auth";
import FormInput from "../components/FormInput";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <section className="min-w-[390px] max-w-[1440px] min-h-[844px] max-h-[1024px] mx-auto px-[25px]">
      <ToastContainer />
      <div className="pt-[143px] pb-[59px] max-w-[569px] mx-auto xl:pt-10">
        <h1 className="mb-[59px] text-2xl font-semibold leading-normal 2xl:text-[30px] 2xl:mb-5">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit}>
          <FormInput
            htmlFor="new password"
            label="New Password"
            type="password"
            name="password"
            id="new password"
            placeholder="password"
            required={true}
          />

          <FormInput
            htmlFor="confirm password"
            label="Confirm Password"
            type="password"
            name="password"
            id="confirm password"
            placeholder="password"
            required={true}
          />

          <div className="mt-[46px]">
            <button
              type="submit"
              className="py-4 font-medium pr-bg-clr text-white w-full mt-[6px] rounded-lg"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default ForgotPassword;
