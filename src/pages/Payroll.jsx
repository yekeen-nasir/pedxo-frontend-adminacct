import expenseavatar from "../assets/svg/expenseavatar.svg";
import PrimaryBtn from "../components/PrimaryBtn";
import AddDeveloperBtn from "../components/AddDeveloperBtn";
import CreateContractBtn from "../components/CreateContractBtn";

const Payroll = () => {
  const employees = [
    {
      name: "Mike Santos",
      country: "United kingdom",
      position: "Backend Developer",
      amount: "$5000",
      status: "Payment Due",
    },

    // Add more employees here as needed
  ];

  return (
    <section>
      <div className="relative top-[128px] mx-5 md:top-[61px] xl:ml-[86px] xl:mr-[65px]">
        <div className="flex flex-col  lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xl font-medium lg:text-[30px] lg:font-semibold xl:mb-[11px]">
              Payroll
            </div>
            <div className="font-semibold xl:text-2xl">
              <span className="mr-6" style={{ color: "#00B9CB" }}>
                Pay contractors
              </span>
              <span style={{ color: "rgba(0, 0, 0, 0.20)" }}>Paid</span>
            </div>
          </div>

          <div className="hidden md:flex gap-2">
            <AddDeveloperBtn />
            <CreateContractBtn />
          </div>
        </div>
        <div className="xl:mt-[46px] flex flex-col ">
          <div className="flex flex-col gap-4 mt-[21px] xl:flex-col-reverse xl:gap-[10px] xl:w-full lg:hidden">
            <div
              className="flex justify-between items-center px-[13px] py-[11px] rounded-lg user-bg-clr xl:px-10 xl:py-5"
              style={{ border: "1px solid rgba(0, 0, 0, 0.05)" }}
            >
              <div className="text-[0.625rem] font-semibold xl:text-xl">
                Select to pay all at once
              </div>

              <input type="checkbox" name="" id="" className="xl:w-6 xl:h-6" />
            </div>

            {employees.map((employee, index) => (
              <div
                key={index}
                className="flex justify-between font-medium px-[18px] py-[22px] rounded-lg xl:flex-row xl:items-center xl:px-10  xl:py-[20px] "
                style={{ border: "0.5px solid rgba(0, 0, 0, 0.20)" }}
              >
                <div className="xl:flex xl:items-center">
                  <div className="flex gap-[10px] xl:items-center">
                    <img src={expenseavatar} alt="profile photo" />
                    <div className="xl:flex">
                      <div className="text-sm xl:text-sm">{employee.name}</div>
                      <div className="text-[0.75rem] xl:text-sm xl:ml-[110px]">
                        {employee.country}
                      </div>
                    </div>
                  </div>

                  <div className="text-[0.75rem] xl:text-sm mt-[13px] xl:mt-0">
                    {employee.position}
                  </div>
                </div>
                <div className="flex justify-between gap-[50px] xl:flex-row-reverse xl:ml-[50px]">
                  <div className="flex flex-col items-center text-[0.5rem] ">
                    <span
                      className="px-[10px] py-[3px] rounded-[4px]  max-h-max xl:hidden"
                      style={{ backgroundColor: "rgba(255, 0, 0, 0.20)" }}
                    >
                      Due
                    </span>
                    <span
                      className="text-sm font-medium hidden xl:block xl:ml-[50px]"
                      style={{ color: "#F00" }}
                    >
                      {employee.status}
                    </span>
                  </div>
                  <div className="text-sm flex flex-col justify-between">
                    {employee.amount}

                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="w-4 h-4 ml-auto xl:hidden"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[21px] hidden xl:w-full lg:block ">
            <div
              className="grid grid-cols-6 gap-5 font-medium mb-[15px] px-10 "
              style={{ color: "rgba(0, 0, 0, 0.60)" }}
            >
              <div>Name</div>
              <div>Country</div>
              <div>Position</div>
              <div>Monthly Pay</div>
              <div>Status</div>
            </div>
            <div>
              {employees.map((employee, index) => (
                <div key={index} className="flex flex-col gap-[10px]">
                  <div
                    className="grid grid-cols-6 items-center gap-5 px-10 py-5 rounded-lg text-sm font-medium "
                    style={{ border: "1px solid rgba(0, 0, 0, 0.05)" }}
                  >
                    <div className="flex items-center gap-[10px]">
                      <div
                        className="w-9 h-9 rounded-full"
                        style={{ backgroundColor: "#D9D9D9" }}
                      >
                        <img src={expenseavatar} alt="profile photo" />
                      </div>
                      <div>{employee.name}</div>
                    </div>
                    <div>{employee.country}</div>
                    <div> {employee.position}</div>
                    <div>$5000</div>
                    <div style={{ color: "#F00" }}>{employee.status}</div>

                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="w-6 h-6 ml-auto "
                    />
                  </div>
                </div>
              ))}
            </div>
            <div
              className="flex justify-between items-center px-10 py-5 mt-[10px] rounded-lg user-bg-clr"
              style={{ border: "1px solid rgba(0, 0, 0, 0.05)" }}
            >
              <div className="text-xl font-semibold ">
                Select to pay all at once
              </div>
              <div>
                <input type="checkbox" name="" id="" className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex items-center justify-between gap-6 mt-[19px] xl:justify-end">
            <div className="text-sm font-medium mt-[10px] xl:text-[22px]">
              Total Amount: $15,000
            </div>
            <div>
              <PrimaryBtn text="Make Payment" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Payroll;

// import { nanoid } from "nanoid";
// import SearchingDoc from "../components/SearchingDoc";

// const Payroll = () => {
//   const onBoarding = [
//     {
//       id: nanoid(),
//       title: "View all due and paid team.",
//       desp: "Review draft contractor payments that have been automatically generated. Ensure all details are accurate",
//     },
//     {
//       id: nanoid(),
//       title: "Simple one-click payment",
//       desp: "Choose to pay all your due team members at once or select them individually",
//     },
//     {
//       id: nanoid(),
//       title: "Automated payment process",
//       desp: "Once you've successfully paid your team, an invoice will be generated for your records. After the funds are received, your contractors will be paid seamlessly",
//     },
//   ];

//   return (
//     <div>
//       <SearchingDoc
//         heading="Payroll"
//         noticeText="How onboarding works?"
//         searchingdocTitle="No Payroll Yet"
//         searchingdocText="They would be generated when you start
//  making payment"
//         onBoarding={onBoarding}
//       />
//     </div>
//   );
// };
// export default Payroll;
