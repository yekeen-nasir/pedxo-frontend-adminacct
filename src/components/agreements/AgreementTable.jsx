import { Link } from "react-router-dom";
import expenseavatar from "../../assets/svg/expenseavatar.svg";
import SearchInput from "../../components/SearchInput";
import AgreementsCard from "./AgreementsCard";

const AgreementTable = () => {
  const employees = [
    {
      name: "Mike Santos",
      country: "United kingdom",
      position: "Backend Developer",
      amount: "$5000",
      seniorityLevel: "Director",
      status: "Paid",
    },

  ];
  return (
    <section>
      <div>
        <div className=" font-semibold mt-2 mb-5 xl:text-xl xl:mt-0 xl:mb-10">
          Overall Client's Agreements
        </div>
        <div className="flex items-center justify-between font-medium mt-2 lg:justify-self-start xl:text-xl">
          <div className="flex items-center gap-1 md:mr-[21px]">
            Active Developers
            <div
              className="w-3 h-3 rounded-full "
              style={{ backgroundColor: "#008000" }}
            ></div>
          </div>
          <div>
            <SearchInput />
          </div>
        </div>

        <div>
          <AgreementsCard />
        </div>
      </div>
    </section>
  );
};
export default AgreementTable;
