import FormInput from "../components/FormInput";
import girlBg from "../assets/png/girl.png";

const ForgotPassword = () => {
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
        <h1 className="mb-[59px] text-2xl font-semibold leading-normal 2xl:text-[30px] 2xl:mb-5">
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
