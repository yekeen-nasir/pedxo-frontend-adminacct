import expenseavatar from "../../assets/svg/expenseavatar.svg";

const ExpensesTable = () => {
  const employees = [
    {
      name: "Mike Santos",
      country: "India",
      position: "Backend Developer",
      amount: "$5000",
    },

  ];
  return (
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

      <div className="mt-[21px] hidden xl:w-full lg:block ">
        <div
          className="grid grid-cols-4 gap-5 font-medium mb-[15px] px-10 "
          style={{ color: "rgba(0, 0, 0, 0.60)" }}
        >
          <div>Name</div>
          <div>Country</div>
          <div>Position</div>
          <div>Amount</div>
        </div>
        <div>
          {employees.map((employee, index) => (
            <div key={index} className="flex flex-col gap-[10px]">
              <div
                className="grid grid-cols-4 items-center gap-5 px-10 py-5 rounded-lg text-sm font-medium"
                style={{ border: "1px solid rgba(0, 0, 0, 0.05)" }}
              >
                <div className="flex items-center gap-[10px]">
                  <div
                    className="w-9 h-9 rounded-full"
                    //   style={{ backgroundColor: "#D9D9D9" }}
                  >
                    <img src={expenseavatar} alt="profile photo" />
                  </div>
                  <div>{employee.name}</div>
                </div>
                <div>{employee.country}</div>
                <div> {employee.position}</div>
                <div>$5000</div>
                <div style={{ color: "#008000" }}>{employee.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ExpensesTable;
