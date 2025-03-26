import sign from "../../assets/svg/sign.svg";
import { useSearchParams } from "react-router-dom";
import { formatCurrency, formatDate } from "../../utlity/helper";
import useFinalizeContract from "../../features/contracts/useFinalizeContract";
import Button from "../Button";

const FormFour = ({
  savedState,
  heading,
  nextStep,
  setCurrentStep,
  signature,
  hasSignature,
}) => {
  const [searchParams] = useSearchParams();
  const contractType = searchParams.get("contractType") || "";
  const { finalize, sendingForm } = useFinalizeContract();

  const userInfo = [
    {
      title: "Contract Type",
      data: contractType.split("-").join(" "),
    },

    {
      title: "Start Date",
      data: formatDate(savedState.startDate) || "-",
    },

    {
      title: "End Date",
      data: formatDate(savedState.endDate) || "-",
    },
    {
      title: "Job Title",
      data: savedState.roleTitle || "-",
    },
    {
      title: "Seniority Level",
      data: savedState.seniorityLevel || "-",
    },

    {
      title: "Scope of Work",
      data: savedState.scopeOfWork || "-",
    },
    {
      title: "Payment Rate",
      data:
        formatCurrency(
          savedState.paymentRate,
          savedState.country === "Nigeria" ? "NGN" : "USD",
          savedState.country === "Nigeria" ? "en-NG" : "en-US"
        ) || null,
    },
    {
      title: "Payment Frequency",
      data: savedState.paymentFrequency || null,
    },
  ];

  const sendFinalForm = () => {
    finalize(savedState);
  };

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="text-lg font-semibold leading-normal xl:text-2xl xl:mb-[18px]">
        {heading}
      </div>

      <div className="bg-white rounded-lg border border-solid border-[#00000033] px-10 pt-[53px] text-[0.625rem] xl:text-[1.125rem]">
        {userInfo.map((item, index) => (
          <div className="flex justify-between mb-[45px]" key={index}>
            <p className="text-[#00000080]">{item.title}</p>
            <p className="text-right capitalize">{item.data}</p>
          </div>
        ))}

        <div className={`mb-[39px] ${signature ? "block" : "hidden"} `}>
          <div className="w-full h-[0.5px] bg-[#0000004d]"></div>
          <div className="mt-[39px] max-w-[100px] mx-auto">
            {signature && <img src={signature} alt="user signature" />}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          if (hasSignature) {
            setCurrentStep(5);
          } else {
            nextStep();
          }
        }}
        className="flex items-center justify-between border border-solid border-[#00000033] px-[15px] py-[10px] bg-[#d9d9d980] rounded-lg xl:px-[30px] xl:py-[19px] cursor-pointer"
      >
        <div className="font-medium text-[0.6875rem] text-[#00000099] xl:text-[1.125rem]">
          {hasSignature ? "Re-Sign Contract" : "Sign Contract"}
        </div>

        <div>
          <img src={sign} alt="sign icon" />
        </div>
      </button>

      {hasSignature && (
        // <button
        //   // onClick={formik.handleSubmit}
        //   type="button"
        //   onClick={sendFinalForm}
        //   className={`pr-bg-clr flex items-center justify-center mt-[18px] w-full rounded-lg text-white text-[0.75rem] py-[14px] lg:w-auto lg:mx-auto lg:px-[60px] xl:py-6 xl:text-xl xl:mt-[36px]

        //                   `}
        // >
        //   Send Contract
        // </button>
        <div className="w-full flex items-center justify-center">
          <Button type="primary" onClick={sendFinalForm} isLoading={sendingForm} disabled={sendingForm} size="full">
            Send Contract
          </Button>
        </div>
      )}
    </div>
  );
};
export default FormFour;
