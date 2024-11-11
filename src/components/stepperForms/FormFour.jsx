// import sign from "../../assets/svg/sign.svg";

const FormFour = () => {
  return (
    <div>
      <div className="flex flex-col gap-[18px]">
        <div className="text-lg font-semibold leading-normal xl:text-2xl xl:mb-[18px]">
          Review and Sign Contract
        </div>

        <div
          className="flex justify-between bg-white rounded-lg px-10 pt-[53px] pb-[45px] text-[0.625rem] xl:text-[1.125rem] mb-[28px]"
          style={{
            border: "1px solid rgba(0, 0, 0, 0.20)",
          }}
        >
          <div
            className="flex flex-col gap-10 font-normal"
            style={{
              color: "rgba(0, 0, 0, 0.50)",
            }}
          >
            <div>Contract Type</div>
            <div>Start Date</div>
            <div>End Date</div>
            <div>Job Title</div>
            <div>Seniority Level</div>
            <div>Scope of work</div>
            <div>Payment Rate</div>
            <div>Payment Frequency</div>
          </div>
          <div className=" flex flex-col gap-10 font-medium">
            <div>Contract Type</div>
            <div>Contract Type</div>
            <div>Contract Type</div>
            <div>Contract Type</div>
            <div>Contract Type</div>
            <div>Contract Type</div>
            <div>Contract Type</div>
            <div>Contract Type</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormFour;
