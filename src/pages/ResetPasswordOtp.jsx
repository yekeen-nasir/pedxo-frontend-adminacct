import { useState } from "react";
import authFetch from "../components/auth";
import FormInput from "../components/FormInput";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordOtp = () => {
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSuccessFul, setIsOtpSuccessful] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const handleOtpRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const emailAddress = {
      email: email,
    };

    try {
      const res = await authFetch.post(
        "/auth/forgot-password",
        JSON.stringify(emailAddress)
      );
      if (res.status === 201 ) {
        toast.success("otp sent, kindly check your email");
        setIsOtpSuccessful(true);
      }
      console.log(res);
    } catch (error) {
      toast.error(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="min-w-[390px] max-w-[1440px] min-h-[844px] max-h-[1024px] mx-auto px-[25px]">
      <ToastContainer />
      <div className="pt-[143px] pb-[59px] max-w-[569px] mx-auto xl:pt-10">
        <h1 className="mb-[59px] text-2xl font-semibold leading-normal 2xl:text-[30px] 2xl:mb-5">
          Request OTP
        </h1>
        <form onSubmit={handleOtpRequest}>
          <FormInput
            htmlFor="email"
            label="Email"
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={handleChange}
          />

          <div className={`${isOtpSuccessFul ? "block" : "hidden"}`}>
            <FormInput
              htmlFor="number"
              label="OTP"
              type="number"
              name="number"
              id="number"
              placeholder="insert otp"
            />
          </div>

          <div className="mt-[46px]">
            <button
              type="submit"
              className="py-4 font-medium pr-bg-clr text-white w-full mt-[6px] rounded-lg"
            >
              {isLoading ? <div className="loading"></div> : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default ResetPasswordOtp;
