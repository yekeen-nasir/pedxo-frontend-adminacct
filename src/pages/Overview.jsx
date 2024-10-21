import OverviewResults from "../components/OverviewResults";
import moneybag from "../assets/svg/moneybag.svg";
import people from "../assets/svg/people.svg";
import telegram from "../assets/svg/telegram.svg";
import { NavLink } from "react-router-dom";

const Overview = () => {
  return (
    <section className="">
      {/* absolute top-0  */}
      <div className=""> 
        <header className="text-center py-2 overflow-banner text-sm font-medium px-[17px] md:text-[18px]">
          Hire Nigerian 🇳🇬 Devs by recommendation and Pay them as you go
        </header>

        <div className="mx-[19px] mt-10">
          <h1 className="text-[20px] font-semibold leading-normal md:text-[30px]">
            Welcome Victor
          </h1>
          <p className="text-sm font-medium leading-normal grey-text md:text-[16px]">
            We hope you’re having a good day!
          </p>

          <div className="px-[22px] pt-[21px] pb-[39px] mt-[62px] overview-expense-bg flex flex-col gap-6 2xl:px-[92px]">
            <OverviewResults
              title="Total Expenses"
              subTitle="Total amount you’ve spent on your contractors"
              icon={moneybag}
              amount="$0"
            />

            <div className="relative">
              <OverviewResults
                title="Active Contributors"
                subTitle="Current contractors on your team"
                icon={people}
                amount="0"
              />
              <div className="absolute top-[50%] right-[20px] text-[12px] text-white px-5 py-[14px] pr-bg-clr rounded-lg font-semibold md:text-[16px] md:top-[55%]">
                <NavLink to="/dashboard/create-contract">
                  +create contract
                </NavLink>
              </div>
            </div>

            <div className="relative">
              <OverviewResults
                title="Onboarding"
                subTitle="Pending contracts on their way"
                icon={telegram}
                amount="0"
              />
              <div
                className="absolute top-[50%] right-[20px] text-sm px-5 py-[14px]  font-medium md:text-[16px] md:top-[55%]"
                style={{ color: "rgba(0, 0, 0, 0.70)" }}
              >
                pending
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Overview;
