import closeIcon from "..//assets/svg/closesuccess.svg";
import sentIcon from "../assets/svg/sentsuccess.svg";

const ContractSentSuccess = () => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="font-poppins w-[292px] bg-white flex flex-col items-center px-[21px] pb-[43px] xl:w-[541px] xl:px-[58px] xl:pb-[55px]">
          <div className="ml-auto mt-[21px] w-[14px] xl:w-6 xl:mt-[50px]">
            <img src={closeIcon} alt="close icon" />
          </div>
          <div className="w-[120px] xl:w-[250px] xl:mt-[46px]">
            <img src={sentIcon} alt="sent successfully icon" />
          </div>
          <div
            className="text-sm font-semibold mb-[11px] xl:text-xl"
            style={{ color: "#008000" }}
          >
            Contract Sent Successful
          </div>
          <p
            className="text-[0.625rem] font-medium text-center xl:text-[0.75rem]"
            style={{ color: "rgba(0, 0, 0, 0.40)" }}
          >
            Your contract is on the way! We will review it and have your
            developer sign the contract, then automatically onboard them to your
            “Teams” Dashboard
          </p>
        </div>
      </div>
    </div>
  );
};
export default ContractSentSuccess;
