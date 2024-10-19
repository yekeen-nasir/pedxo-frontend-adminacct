import { Link } from "react-router-dom";
import googleLogo from "../assets/svg/google-logo.svg";
import girlBg from "../assets/png/girl.png";
import FormInput from "../components/FormInput";

const login = () => {
  return (
    <section className="2xl:grid grid-cols-2 gap-[130px] items-center ">
      <div className="image-wrapper hidden 2xl:block">
        <img src={girlBg} alt="a lady drinking coffee" />
        <div className="overlay"></div>
        <div className="text uppercase text-[50px] font-bold text-white top-[83px] left-[112px]">
          pedxo
        </div>
      </div>
      <div className="pt-[143px] pb-[59px] max-w-[569px] mx-auto 2xl:mx-0 2xl:py-0">
        <h1 className="mb-[59px] text-2xl font-semibold leading-normal 2xl:text-[30px] ">
          Login
        </h1>
        <form>
          <div className="flex items-center justify-center p-4 gap-[10px] border border-black rounded-lg mb-[15px]">
            <img src={googleLogo} alt="google logo" />
            <span className="font-medium">Continue with Google</span>
          </div>
          <div className="text-lg font-medium line-with-text">Or</div>

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
          <div className="text-clr font-medium">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="py-4 font-medium bg-clr text-white w-full mt-[6px] rounded-lg"
            >
              Continue
            </button>
          </div>
        </form>
        <div className="flex gap-2 text-[15px] mt-[13px] font-medium">
          <span>Don't have an account?</span>
          <div className="text-clr">
            <Link to="/signup">Create account</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default login;
