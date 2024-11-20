// import { nanoid } from "nanoid";

import DashboardHeading from "../components/DashboardHeading";
import expenseavatar from "../assets/svg/expenseavatar.svg";

const Expenses = () => {
  const employees = [
    {
      name: "Mike Santos",
      country: "India",
      position: "Backend Developer",
      amount: "$5000",
    },
   
    // Add more employees here as needed
  ];

  return (
    <section>
      <div className="mt-[62px] mx-5 xl:ml-[86px] xl:mr-[65px]">
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

          <div className="flex flex-col gap-4 mt-[21px] xl:w-full xl:gap-[10px] lg:hidden">
            {employees.map((employee, index) => (
              <div
                key={index}
                className="flex justify-between gap-[13px] font-medium px-[18px] py-[22px] rounded-lg xl:flex-row xl:py-[20px] xl:pl-[40px] xl:pr-[70px] xl:items-center "
                style={{ border: "0.5px solid rgba(0, 0, 0, 0.20)" }}
              >
                <div className="xl:flex xl:items-center ">
                  <div className="flex gap-[10px] mb-[13px] xl:mb-0 xl:items-center">
                    <img src={expenseavatar} alt="profile photo" />
                    <div className="xl:flex">
                      <div className="text-sm xl:text-sm">{employee.name}</div>
                      <div className="text-[0.75rem] xl:text-sm xl:ml-[73px]">
                        {employee.country}
                      </div>
                    </div>
                  </div>
                  <div className="text-[0.75rem] xl:text-sm xl:ml-[124px]">
                    {employee.position}
                  </div>
                </div>
                <div className="text-sm ">{employee.amount}</div>
              </div>
            ))}
          </div>

          <div className="mt-[21px] hidden xl:w-full lg:block">
            <table className="w-full border-collapse">
              <thead>
                <tr
                  className="text-left"
                  style={{ color: "rgba(0, 0, 0, 0.60)" }}
                >
                  <th className="font-medium pl-[40px] pb-4">Name</th>
                  <th className="font-medium pb-4">Country</th>
                  <th className="font-medium pb-4 m">Position</th>
                  <th className="font-medium pb-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr
                    key={index}
                    className="rounded-lg"
                    style={{ border: "0.5px solid rgba(0, 0, 0, 0.20)" }}
                  >
                    <td className="py-[22px] pl-[40px] xl:py-[20px]">
                      <div className="flex items-center gap-[10px]">
                        <img src={expenseavatar} alt="profile photo" />
                        <div>
                          <div className="text-sm xl:text-sm font-medium">
                            {employee.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-[0.75rem] xl:text-sm py-[22px] xl:py-[20px]">
                      <div className="text-[0.75rem] xl:text-sm">
                        {employee.country}
                      </div>
                    </td>
                    <td className="py-[22px] xl:py-[20px]">
                      <div className="text-[0.75rem] xl:text-sm">
                        {employee.position}
                      </div>
                    </td>
                    <td className="py-[22px] xl:py-[20px]">
                      <div className="text-sm font-medium">
                        {employee.amount}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Expenses;

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
