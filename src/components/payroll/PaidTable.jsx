import { Link } from "react-router-dom";
import expenseavatar from "../../assets/svg/expenseavatar.svg";

const PaidTable = () => {
  const employees = [
    {
      name: "Mike Santos",
      country: "United kingdom",
      position: "Backend Developer",
      amount: "$5000",
      status: "Paid",
    },


  ];
  return (
    <section>
      <div className="xl:mt-[46px] flex flex-col">
        <div className="flex flex-col gap-4 mt-[21px] xl:flex-col-reverse xl:gap-[10px] xl:w-full lg:hidden">
          {employees.map((employee, index) => (
            <div
              key={index}
              className="font-medium px-[18px] py-[22px] rounded-lg xl:flex-row xl:items-center xl:px-10  xl:py-[20px] "
              style={{ border: "0.5px solid rgba(0, 0, 0, 0.20)" }}
            >
              <div className="flex justify-between">
                <div className="flex gap-[10px] xl:items-center">
                  <img src={expenseavatar} alt="profile photo" />
                  <div className="xl:flex">
                    <div className="text-sm xl:text-sm">{employee.name}</div>
                    <div className="text-[0.75rem] xl:text-sm xl:ml-[110px]">
                      {employee.country}
                    </div>
                  </div>
                </div>
                <div
                  className="px-[10px] py-[3px] rounded-[4px] text-[0.5rem]  max-h-max xl:hidden"
                  style={{ backgroundColor: " rgba(0, 128, 0, 0.20)" }}
                >
                  {employee.status}
                </div>
                <div className="text-sm flex flex-col justify-between">
                  {employee.amount}
                </div>
              </div>

              <div className="flex items-center justify-between mt-[13px] xl:mt-0">
                <div className="text-[0.75rem] xl:text-sm ">
                  {employee.position}
                </div>
                <div className="py-[7px] px-[9px] font-semibold text-[0.625rem] text-center pr-bg-clr text-white rounded-lg max-w-max ">
                  <Link
                  // to="/dashboard/add-developer"
                  >
                    Receipt
                  </Link>
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
            <div>Action</div>
          </div>
          <div>
            {employees.map((employee, index) => (
              <div key={index} className="flex flex-col gap-[10px]">
                <div
                  className="grid grid-cols-6 items-center gap-5 px-10 py-5 rounded-lg text-sm font-medium"
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
                  <div className="py-[1em] px-[2em]  font-semibold text-[0.625rem] text-center pr-bg-clr text-white rounded-lg max-w-max xl:text-[0.75rem] xl:p-[9px]">
                    <Link
                    // to="/dashboard/add-developer"
                    >
                      View Receipt
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default PaidTable;
