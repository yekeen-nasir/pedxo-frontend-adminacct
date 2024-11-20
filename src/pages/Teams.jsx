import { nanoid } from "nanoid";
// import SearchingDoc from "../components/SearchingDoc";
import AddDeveloperBtn from "../components/AddDeveloperBtn";
import CreateContractBtn from "../components/CreateContractBtn";
import TeamsTable from "../components/teams/TeamsTable";

const Teams = () => {
  const onBoarding = [
    {
      id: nanoid(),
      title: "Create and send contract",
      desp: "You will create contract by filling information like personal details, role details, compensation and budget",
    },
    {
      id: nanoid(),
      title: "Our Team Review ",
      desp: "Pedxo will review and recommend a good fit according to your requirement via email.",
    },
    {
      id: nanoid(),
      title: "Notification",
      desp: "You will receive a notification, once your developer has signed the contract and will be automatically added to your team",
    },
  ];

  return (
    <div>
      <div className="mt-[62px] mx-5 flex flex-col xl:ml-[86px] xl:mr-[65px] ">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="text-xl font-medium lg:text-[30px] lg:font-semibold xl:mb-[11px]">
            Teams
          </div>
          <div className="hidden md:flex gap-2">
            <AddDeveloperBtn />
            <CreateContractBtn />
          </div>
        </div>

        <div>
          <div>
            <TeamsTable />
          </div>
          {/* <div>
            <SearchingDoc
              noticeText="How onboarding works?"
              searchingdocTitle="Create Contract"
              searchingdocText=" Start creating contract will refer you to your team members. Once
            they are added, you'll see them here"
              onBoarding={onBoarding}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default Teams;
