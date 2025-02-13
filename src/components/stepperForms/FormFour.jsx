import { useState } from "react";
import sign from "../../assets/svg/sign.svg";
import FormFive from "./FormFive";
import sendcontract from "../../assets/svg/sendcontract.svg";
import { useGlobalContext } from "../../Context";
import { useSearchParams } from "react-router-dom";
import { formatCurrency, formatDate } from "../../utlity/helper";

const FormFour = ({
  currentStep,
  setCurrentStep,
  setComplete,
  formik,
  heading,
  signature,
  hasSignature,
}) => {
  const [searchParams] = useSearchParams();
  const contractType = searchParams.get("contractType") || "";

  const userInfo = [
    {
      title: "Contract Type",
      data: contractType.split("-").join(" "),
    },

    {
      title: "Start Date",
      data: formatDate(formik?.values?.startDate) || "-",
    },

    {
      title: "End Date",
      data: formatDate(formik.values.endDate) || "-",
    },
    {
      title: "Job Title",
      data: formik.values.roleTitle || "-",
    },
    {
      title: "Seniority Level",
      data: formik.values.seniorityLevel || "-",
    },

    {
      title: "Scope of Work",
      data: formik.values.scopeOfWork || "-",
    },
    {
      title: "Payment Rate",
      data:
        formatCurrency(
          formik.values.paymentRate,
          formik.values.country === "Nigeria" ? "NGN" : "USD",
          formik.values.country === "Nigeria" ? "en-NG" : "en-US"
        ) || null,
    },
    {
      title: "Payment Frequency",
      data: formik.values.paymentFrequency || null,
    },
  ];

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

      {!hasSignature && (
        <button
          type="button"
          onClick={() => setCurrentStep(5)}
          className="flex items-center justify-between border border-solid border-[#00000033] px-[15px] py-[10px] bg-[#d9d9d980] rounded-lg xl:px-[30px] xl:py-[19px] cursor-pointer"
        >
          <div className="font-medium text-[0.6875rem] text-[#00000099] xl:text-[1.125rem]">
            Sign Contract
          </div>

          <div>
            <img src={sign} alt="sign icon" />
          </div>
        </button>
      )}
      {hasSignature && (
        <button
          onClick={formik.handleSubmit}
          type="submit"
          className={`pr-bg-clr flex items-center justify-center mt-[18px] w-full rounded-lg text-white text-[0.75rem] py-[14px] lg:w-auto lg:mx-auto lg:px-[60px] xl:py-6 xl:text-xl xl:mt-[36px] 
                          
                          `}
        >
          Send Contract <img src={sendcontract} alt="send icon" />
        </button>
      )}
    </div>
  );
};
export default FormFour;

// {
//   title: "Contract Type",
//   data: "Contract type",
// },
// {
//   title: "Start Date",
//   data: formStepperData.contractStartDate,
// },
// {
//   title: "End Date",
//   data: formStepperData.contractEndDate,
// },
// {
//   title: "Role Title",
//   data: formStepperData.roleTitle,
// },
// {
//   title: "Seniority Level",
//   data: formStepperData.seniorityLevel,
// },
// {
//   title: "Scope of work",
//   data: formStepperData.responsibility,
// },
// {
//   title: "Payment Rate",
//   data: "Contract type",
// },
// {
//   title: "Payment Frequency",
//   data: "Contract type",
// },
