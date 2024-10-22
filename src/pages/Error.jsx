import { NavLink } from "react-router-dom";
import pagenotfound from "../assets/png/pagenotfound.png";

const Error = () => {
  return (
    <div className="flex items-center justify-center gap-10 h-screen text-center mx-[21px] xl:mx-[123px] xl:text-left">
      <div>
        <div className="text-[30px] font-bold mb-[45px] xl:text-[80px]">Oops!</div>
        <p className="text-2xl xl:text-[40px] font-medium mb-[59px] leading-normal max-w-[450px]">
          We can’t find the page you are looking for
        </p>
        <div className="flex justify-center xl:justify-start">
          <NavLink
            to="/dashboard"
            className="flex items-center text-white px-3 py-[10px] xl:px-[49px] xl:py-[29px] pr-bg-clr rounded-full font-semibold xl:text-[22px]"
          >
            Go to Homepage
          </NavLink>
        </div>
      </div>
      <div className="hidden xl:block">
        <img src={pagenotfound} alt="" />
      </div>
    </div>
  );
};
export default Error;
