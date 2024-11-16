import AddDeveloperBtn from "../components/AddDeveloperBtn";
import CreateContractBtn from "../components/CreateContractBtn";

const DashboardHeading = ({ heading, subHead }) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <div className="text-[20px] font-medium lg:text-[30px] lg:font-semibol xl:mb-[11px]">
          {heading}
        </div>
        <div className="font-semibold xl:text-2xl">{subHead}</div>
      </div>

      <div className="hidden lg:flex gap-2">
        <AddDeveloperBtn />
        <CreateContractBtn />
      </div>
    </div>
  );
};
export default DashboardHeading;
