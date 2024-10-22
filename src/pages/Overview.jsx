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
            <div>
              <h2 className="font-semibold leading-normal md:text-[27px]">
                Total Expenses
              </h2>
              <p className="mb-2 text-sm font-medium leading-normal grey-text pr-[51px] md:text-[16px]">
                Total amount you've spent on your contractors
              </p>

              <div className="flex justify-between bg-white rounded-lg py-3 px-[21px] md:py-10 md:px-16">
                <div className="flex items-center gap-4">
                  <img src={moneybag} alt="" />
                  <span className="text-2xl font-semibold leading-normal">
                    $0
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-semibold leading-normal md:text-[27px]">
                Active Contractors
              </h2>
              <p className="mb-2 text-sm font-medium leading-normal grey-text pr-[51px] md:text-[16px]">
                Current contractors on your team
              </p>

              <div className="flex justify-between bg-white  rounded-lg py-3 px-[21px] md:py-10 md:px-16">
                <div className="flex items-center gap-4">
                  <img src={people} alt="" />
                  <span className="text-2xl font-semibold leading-normal">
                    0
                  </span>
                </div>
                <div className="text-[0.8rem] text-white px-3 py-[10px] sm:px-5 sm:py-[14px] pr-bg-clr rounded-lg font-semibold md:text-[16px]">
                  <NavLink to="/dashboard/create-contract">
                    +Create Contract
                  </NavLink>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-semibold leading-normal md:text-[27px]">
                Onboarding
              </h2>
              <p className="mb-2 text-sm font-medium leading-normal grey-text pr-[51px] md:text-[16px]">
                Pending contracts on their way
              </p>

              <div className="flex justify-between bg-white  rounded-lg py-3 px-[21px] md:py-10 md:px-16">
                <div className="flex items-center gap-4">
                  <img src={telegram} alt="" />
                  <span className="text-2xl font-semibold leading-normal">
                    0
                  </span>
                </div>
                <div
                  className="text-[14px] pl-5 py-[14px] rounded-lg font-medium md:text-[16px]"
                  style={{ color: "rgba(0, 0, 0, 0.70)" }}
                >
                  Pending
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Overview;
