// import { nanoid } from "nanoid";

import DashboardHeading from "../components/DashboardHeading";
import expenseavatar from "../assets/svg/expenseavatar.svg";

const Expenses = () => {
  return (
    <section>
      <div className="relative top-[128px] mx-5 xl:top-[61px] xl:ml-[86px] xl:mr-[65px]">
        <DashboardHeading heading="Expenses" subHead="August/2024" />
        <div className="xl:flex xl:flex-row-reverse xl:gap-5 xl:mt-[46px]">
          <div
            className="rounded-lg mt-[21px] p-5 font-semibold xl:py-[32px] xl:pl-[31px] xl:pr-[115px]"
            style={{
              backgroundColor: " rgba(0, 185, 203, 0.20)",
              border: "1px solid #00B9CB",
            }}
          >
            <div className="text-base xl:text-xl">Total Spent</div>
            <div className="text-[1.875rem] xl:text-[2.5rem]">$50,000</div>
            <div
              className="text-[0.75rem] font-medium xl:text-base xl:mt-[23px] xl:mb-[7px]"
              style={{ color: "#F00" }}
            >
              Due Payment
            </div>
            <div
              className="text-xl font-semibold text-[1.625rem] "
              style={{ color: "#F00" }}
            >
              $15,000
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-[21px] xl:w-full xl:gap-[10px]">
            <div
              className="flex justify-between gap-[13px] font-medium px-[18px] py-[22px] rounded-lg xl:flex-row xl:py-[20px] xl:pl-[40px] xl:pr-[70px] xl:items-center "
              style={{ border: "0.5px solid rgba(0, 0, 0, 0.20)" }}
            >
              <div className="xl:flex xl:items-center ">
                <div className="flex gap-[10px] mb-[13px] xl:mb-0 xl:items-center">
                  <img src={expenseavatar} alt="profile photo" />
                  <div className="xl:flex">
                    <div className="text-sm  xl:text-sm">
                      Mike Santos
                    </div>
                    <div className="text-[0.75rem] xl:text-sm xl:ml-[73px]">
                      India
                    </div>
                  </div>
                </div>
                <div className="text-[0.75rem]  xl:text-sm xl:ml-[124px]">
                  Backend Developer
                </div>
              </div>
              <div className="text-sm ">$5000</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Expenses;

{
  /* <div className="flex flex-col gap-4 mt-[21px] xl:w-full">
            <div
              className="flex flex-col gap-[13px] px-[18px] py-[22px] rounded-lg xl:flex-row"
              style={{ border: "0.5px solid rgba(0, 0, 0, 0.20)" }}
            >
              <div className="flex justify-between">
                <div className="flex gap-[10px]">
                  <img src={expenseavatar} alt="profile photo" />
                  <>
                    <div className="text-sm font-medium">Mike Santos</div>
                    <div
                      className="text-[0.75rem] font-normal"
                      style={{ color: "rgba(0, 0, 0, 0.50)" }}
                    >
                      India
                    </div>
                  </>
                </div>
                <div className="text-sm font-medium">$5000</div>
              </div>
              <div className="text-[0.75rem] font-medium">
                Backend Developer(Director)
              </div>
            </div>
          </div> */
}

// import { nanoid } from "nanoid";
// import SearchingDoc from "../components/SearchingDoc";
// import DashboardHeading from "../components/DashboardHeading";

// const Expenses = () => {
//   const onBoarding = [
//     {
//       id: nanoid(),
//       title: "Manage expense requests",
//       desp: "Any payment history for your team will appear and be stored here for future reference",
//     },
//     {
//       id: nanoid(),
//       title: "Review expenses requests",
//       desp: "Review pending and successful expense requests for your team. Ensure all pending requests are addressed and processed immediately",
//     },
//   ];

//   return (
//     <div ">
//       <DashboardHeading heading="Expenses" subHead="August/2024" />
//       <SearchingDoc
//         heading="Expenses"
//         subHead="August/2024"
//         noticeText="Add devs and pay them to see their records here."
//         searchingdocTitle="No Payroll Yet"
//         searchingdocText="They would be generated when you start
//  making payment"
//         onBoarding={onBoarding}
//       />
//     </div>
//   );
// };
// export default Expenses;
