import { nanoid } from "nanoid";
// import SearchingDoc from "../components/SearchingDoc";
import AddDeveloperBtn from "../components/AddDeveloperBtn";
import CreateContractBtn from "../components/CreateContractBtn";
import AgreementTable from "../components/agreements/AgreementTable";
import { NavLink } from "react-router-dom";
import { SearchingDoc } from "../components";
import SearchInput from "../components/SearchInput";
import AgreementsCard from "../components/agreements/AgreementsCard";
import expenseavatar from "../assets/svg/expenseavatar.svg";

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

  const agreementsCards = [
    {
      avatar: expenseavatar,
      name: "Mike Santos",
      id: "contract1",
      link: "View contract",
    },
    {
      avatar: expenseavatar,
      name: "Mike Santos",
      id: "contract2",
      link: "View contract",
    },
    {
      avatar: expenseavatar,
      name: "Mike Santos",
      id: "contract3",
      link: "View contract",
    },
    {
      avatar: expenseavatar,
      name: "Mike Santos",
      id: "contract4",
      link: "View contract",
    },
  ];

  return (
    <div className="mt-[62px] mx-5 flex flex-col xl:ml-[86px] xl:mr-[65px] ">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-xl font-medium lg:text-[30px] lg:font-semibold xl:mb-5">
          Agreements
        </h1>
        <div className="hidden md:flex gap-2">
          <AddDeveloperBtn />
          <CreateContractBtn />
        </div>
      </div>

      <div className=" font-semibold mt-2 mb-5 xl:text-xl xl:mt-0 xl:mb-10">
        Overall Client&apos;s Agreements
      </div>
      <div className="flex items-center justify-between font-medium mt-2 lg:justify-self-start xl:text-xl">
        <div className="flex items-center gap-1 md:mr-[21px]">
          Active Developers
          <div
            className="w-3 h-3 rounded-full "
            style={{ backgroundColor: "#008000" }}
          ></div>
        </div>
          <SearchInput />
      </div>

      {agreementsCards.length > 0 ? (
        <div className="mt-[23px] grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-[30px] lg:mt-[33px]">
          {agreementsCards.map((el, i) => (
            <AgreementsCard key={i} card={el} />
          ))}
        </div>
      ) : (
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
              <img src={""} alt="" className="w-4 mr-1" /> Create new contract
            </NavLink>
          </div>
        </SearchingDoc>
      )}
    </div>
  );
};
export default Agreements;
