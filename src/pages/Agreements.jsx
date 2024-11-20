import { nanoid } from "nanoid";
// import SearchingDoc from "../components/SearchingDoc";
import AddDeveloperBtn from "../components/AddDeveloperBtn";
import CreateContractBtn from "../components/CreateContractBtn";
import AgreementTable from "../components/agreements/AgreementTable";
// import { NavLink } from "react-router-dom";
// import add from "../assets/svg/add.svg";

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
      <div className="mt-[62px] mx-5 flex flex-col xl:ml-[86px] xl:mr-[65px] ">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="text-xl font-medium lg:text-[30px] lg:font-semibold xl:mb-5">
            Agreements
          </div>
          <div className="hidden md:flex gap-2">
            <AddDeveloperBtn />
            <CreateContractBtn />
          </div>
        </div>
        <div>
          <div>
            <AgreementTable />
          </div>
          {/* <div>
          <SearchingDoc
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
                <img src={add} alt="" className="w-4 mr-1" /> Create new
                contract
              </NavLink>
            </div>
          </SearchingDoc>
        </div> */}
        </div>
      </div>
    </div>
  );
};
export default Agreements;
