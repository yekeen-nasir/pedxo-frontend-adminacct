import { Link } from "react-router-dom";
import googleLogo from "../assets/google-logo.svg";
import FormInput from "../components/FormInput";

const ForgotPassword = () => {
  return (
    <section>
      <div className="mt-[143px] mb-[59px]">
        <h1 className="mb-[59px] text-2xl font-semibold leading-normal">
          Reset Password
        </h1>
        <form>

          <FormInput
            htmlFor="new password"
            label="New Password"
            type="password"
            name="password"
            id="new password"
            placeholder="password"
            // value=""
            // onChange={}
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
              className="py-4 font-medium bg-clr text-white w-full mt-[6px] rounded-lg"
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
