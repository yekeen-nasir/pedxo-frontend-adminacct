import { useState } from "react";
import FormInput from "../components/FormInput";
import authFetch from "../components/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

const AccountVerification = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const email = location.state?.email;

  const handleChange = (e) => {
    setVerificationCode(e.target.value.slice(0, 6));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const verificationData = {
      email: "efe@gmail.com",
      code: verificationCode,
    };

    try {
      const response = await authFetch.post(
        "/auth/verify-email",
        JSON.stringify(verificationData)
      );
      // const data = await response.json();
      toast.success("Account Created Successfully");
      console.log(response.data);
    } catch (error) {
      if (error.response.data.message[0] === "code should not be empty") {
        toast.error(error.response.data.message[0]);
      } else if (
        error.response.data.message ===
        "Your code has either expire or is Invalid"
      ) {
        toast.error(error.response.data.message);
      }
      toast.error(error.response.data.message);

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
          A verification OTP has been sent to:
          <p className="text-sm" style={{ color: "rgba(0, 0, 0, 0.60)" }}>
            {email}
          </p>
        </h1>
        <form onSubmit={handleFormSubmit}>
          <FormInput
            htmlFor="code"
            label="Enter OTP"
            type="number"
            name="code"
            id="code"
            placeholder="code"
            value={verificationCode}
            onChange={handleChange}
          />

          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="outline-none py-4 font-medium pr-bg-clr text-white w-full mt-[6px] rounded-lg"
            >
              {isLoading ? <div className="loading"></div> : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default AccountVerification;
