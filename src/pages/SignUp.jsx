import { Link } from "react-router-dom";
import googleLogo from "../assets/svg/google-logo.svg";
import girlBg from "../assets/png/girl.png";
import FormInput from "../components/FormInput";

const SignUp = () => {
  return (
    <section className="min-w-[390px] 2xl:max-w-[1512px] min-h-[844px] 2xl:max-h-[1024px] 2xl:mx-auto px-[25px] 2xl:grid grid-cols-2 gap-[130px]">
      <div className="image-wrapper hidden 2xl:block">
        <img src={girlBg} alt="a lady drinking coffee" className="h-full object-cover" />
        <div className="overlay"></div>
        <div className="text uppercase text-[50px] font-bold text-white top-[83px] left-[112px]">
          pedxo
        </div>
      </div> 
      <div className="pt-[143px] pb-[59px] max-w-[569px] mx-auto 2xl:pt-10 2xl:mx-0">
        <Link to="/dashboard">Temp. dashboard link.</Link>
        <h1 className="mb-[59px] text-2xl font-semibold leading-normal 2xl:text-[30px] 2xl:mb-5">
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
          <span>Already have an account?</span>
          <div className="pr-text-clr">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignUp;

{
  /* <div className="relative hidden 2xl:block h-64 w-full bg-custom-gradient">
<div className="text absolute uppercase text-[50px] font-bold text-white top-[83px] left-[112px]">
  pedxo
</div>
<img src={girlBg} alt="a lady drinking coffee" />
<div className="overlay"></div>
</div> */
}
