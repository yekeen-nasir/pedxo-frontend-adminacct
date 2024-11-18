import { NavLink } from "react-router-dom";

const PrimaryBtn = ({text}) => {
  return (
    <div className="py-[1em] px-[2em] xl:py-[15px] xl:px-[31px] font-semibold text-[0.625rem] xl:text-base pr-bg-clr text-white mt-[15px] rounded-lg flex items-center justify-center gap-[10px]">
      <NavLink
        // to="/dashboard/add-developer"
        className="flex items-center gap-[10px]"
      >
        {text}
      </NavLink>
    </div>
  );
};
export default PrimaryBtn;
