import { nanoid } from "nanoid";
import SearchingDoc from "../components/SearchingDoc";
import { NavLink } from "react-router-dom";
import add from "../assets/svg/add.svg";

const Agreements = () => {
  const onBoarding = [
    {
      id: nanoid(),
      title: "Sign Pending agreements",
      desp: "Select the “Sign” button next to the agreement and sign it on the platform",
    },
    {
      id: nanoid(),
      title: "Review your signed agreements",
      desp: "All signed agreements will be stored in this “Agreements” tab. You can download the documents from here or review anytime.",
    },
  ];

  return (
    <div>
      <SearchingDoc
        heading="Agreements"
        noticeText="Add devs and pay them to see their 
records here."
        searchingdocTitle="No Agreement yet"
        searchingdocText="They would be generated when you have
created a contract"
        onBoarding={onBoarding}
      >
        <div className="mt-[33px]">
          <NavLink
            to="/dashboard/create-contract"
            className="flex items-center text-[0.8rem] text-white px-3 py-[10px] sm:px-5 sm:py-[14px] pr-bg-clr rounded-lg font-semibold xl:text-[16px]"
          >
            <img src={add} alt="" className="w-4 mr-1" /> Create new contract
          </NavLink>
        </div>
      </SearchingDoc>
    </div>
  );
};
export default Agreements;
