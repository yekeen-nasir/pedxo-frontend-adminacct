import { NavLink } from "react-router-dom";

function PageNotFound() {
  return (
    <section className="w-full h-screen">
      <div className="flex flex-col items-center justify-center gap-5 h-screen text-center mx-[21px] xl:mx-[123px] xl:text-left">
        <div className="text-[30px] font-bold  xl:text-[80px]">Oops!</div>
        <p className="text-2xl text-center xl:text-[40px] font-medium leading-normal max-w-[450px]">
          We can&apos;t find the page you are looking for
        </p>
        <div className="flex justify-center ">
          <NavLink
            to="/"
            className="flex items-center text-white px-3 py-[10px] xl:px-[49px] xl:py-[29px] pr-bg-clr rounded-full font-semibold xl:text-[22px]"
          >
            Go to Homepage
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default PageNotFound;
