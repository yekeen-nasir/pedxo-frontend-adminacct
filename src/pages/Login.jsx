import { useState } from "react";
import { Link } from "react-router-dom";
import googleLogo from "../assets/svg/google-logo.svg";
import FormInput from "../components/FormInput";
import eyesolid from "../assets/svg/eyesolid.svg";
import eyeslashsolid from "../assets/svg/eyeslashsolid.svg";

const login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <section className="min-w-[390px] max-w-[1440px] min-h-[844px] max-h-[1024px] mx-auto px-[25px]">
      <div className="pt-[143px] pb-[59px] max-w-[569px] mx-auto xl:pt-10">
        <h1 className="mb-[59px] text-2xl font-semibold leading-normal 2xl:text-[30px] ">
          Login
        </h1>
        <form>
          <button className="w-full flex items-center justify-center p-4 gap-[10px] border border-black rounded-lg mb-[15px]">
            <img src={googleLogo} alt="google logo" />
            <span className="font-medium">Continue with Google</span>
          </button>
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

          <div className="relative">
            <FormInput
              htmlFor="password"
              label="Password"
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              id="password"
              placeholder="password"
              // value=""
              // onChange={}
              required={true}
            />

            <div className="w-4 absolute top-[60%] right-0 mr-3">
              {isPasswordVisible ? (
                <img
                  src={eyesolid}
                  alt="password visible icon"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              ) : (
                <img
                  src={eyeslashsolid}
                  alt="password invisible icon"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              )}
            </div>
          </div>

          <div className="pr-text-clr font-medium">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="py-4 font-medium pr-bg-clr text-white w-full mt-[6px] rounded-lg"
            >
              Continue
            </button>
          </div>
        </form>
        <div className="flex gap-2 text-[15px] mt-[13px] font-medium">
          <span>Don't have an account?</span>
          <div className="pr-text-clr">
            <Link to="/signup">Create account</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default login;
