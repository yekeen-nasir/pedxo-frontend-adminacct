import { Link } from "react-router-dom";
import googleLogo from "../assets/google-logo.svg";
import FormInput from "../components/FormInput";

const SignUp = () => {
  return (
    <section>
      <div className="mt-[143px] mb-[59px]">
        <h1 className="mb-[59px] text-2xl font-semibold leading-normal">
          Create account
        </h1>
        <form>
          <div className="flex items-center justify-center p-4 gap-[10px] border border-black rounded-lg mb-[15px]">
            <img src={googleLogo} alt="google logo" />
            <span className="font-medium">Continue with Google</span>
          </div>
          <div className="text-lg font-medium line-with-text">Or</div>
          <FormInput
            htmlFor="first name"
            label="First name"
            type="text"
            name="firstName"
            id="first name"
            placeholder="first name"
            // value=""
            // onChange={}
            required={true}
          />

          <FormInput
            htmlFor="last name"
            label="Last name"
            type="text"
            name="lastName"
            id="last name"
            placeholder="last name"
            // value=""
            // onChange={}
            required={true}
          />

          <FormInput
            htmlFor="email"
            label="Email"
            type="email"
            name="email"
            id="email"
            placeholder="email address"
            // value=""
            // onChange={}
            required={true}
          />

          <FormInput
            htmlFor="password"
            label="Password"
            type="password"
            name="password"
            id="password"
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

          <div>
            <button
              type="submit"
              className="py-4 font-medium bg-clr text-white w-full mt-[6px] rounded-lg"
            >
              Continue
            </button>
          </div>
        </form>
        <div className="flex gap-2 text-[15px] mt-[13px] font-medium">
          <span>Already have an account?</span>
          <div className="text-clr">
            <Link to="">Login</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignUp;
