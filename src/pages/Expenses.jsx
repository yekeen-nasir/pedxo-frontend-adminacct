import { NavLink } from "react-router-dom";
import searchingdoc from "../assets/png/searchingdoc.png";
import adddeveloper from "../assets/svg/adddeveloper.svg";

const Expenses = () => {
  return (
    <section>
      <div className="mx-5">
        <div className="mt-[104px]">
          <div className="text-[20px] font-medium">Expenses</div>
          <div className="font-semibold">August/2024</div>
        </div>

        <div className="flex flex-col items-center justify-center h-screen">
          <div className="mb-[18px]">
            <img src={searchingdoc} alt="searching icon" />
          </div>
          <div className="text-[20px] font-medium">No Expenses Yet</div>
          <p className="grey-text text-[12px] text-center font-normal leading-normal mx-[50px]">
            They would be generated when you start making payments
          </p>
          <div className="py-[14px] px-5 font-medium text-[13px] pr-bg-clr text-white mt-[15px] rounded-lg flex items-center justify-center gap-[10px]">
            <NavLink
              to="/dashboard/add-developer"
              className="flex items-center gap-[10px]"
            >
              <img src={adddeveloper} alt="a user icon" />
              Add Developer
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Expenses;
