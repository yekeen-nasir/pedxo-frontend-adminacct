import { useState } from "react";
import sign from "../../assets/svg/sign.svg";
import FormFive from "./FormFive";
import { useGlobalContext } from "../../Context";

const FormFour = ({ currentStep, setCurrentStep, setComplete, heading, hasSignature }) => {
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const { signature } = useGlobalContext();
  const { formStepperData } = useGlobalContext();

  const userInfo = [
    {
      title: "Contract Type",
      data: "Contract type",
    },

    {
      title: "Payment Rate",
      data: "Contract type",
    },
    {
      title: "Payment Frequency",
      data: "Contract type",
    },
    {
      title: "Contract Type",
      data: "Contract type",
    },

    {
      title: "Payment Rate",
      data: "Contract type",
    },
    {
      title: "Payment Frequency",
      data: "Contract type",
    },
    {
      title: "Contract Type",
      data: "Contract type",
    },

    {
      title: "Payment Rate",
      data: "Contract type",
    },
  ];

  console.log(formStepperData);

  const handleClick = () => {
    () => setIsSignModalOpen(true);
    currentStep === 6 ? setComplete(true) : setCurrentStep((prev) => prev + 1);
  };

  return (
    <div>
      <div className="flex flex-col gap-[18px]">
        {isSignModalOpen ? (
          <FormFive />
        ) : (
          <>
            <div className="text-lg font-semibold leading-normal xl:text-2xl xl:mb-[18px]">
              {heading}
            </div>

            <div className="bg-white rounded-lg border border-solid border-[#00000033] px-10 pt-[53px] text-[0.625rem] xl:text-[1.125rem]">
              {userInfo.map((item, index) => (
                <div className="flex justify-between mb-[45px]" key={index}>
                  <p className="text-[#00000080]">{item.title}</p>
                  <p className="text-right">{item.data}</p>
                </div>
              ))}

              <div className={`mb-[39px] ${signature ? "block" : "hidden"} `}>
                <div className="w-full h-[0.5px] bg-[#0000004d]"></div>
                <div className="mt-[39px] max-w-[100px] mx-auto">
                  {signature && <img src={signature} alt="user signature" />}
                </div>
              </div>
            </div>

            {hasSignature && (
              <div
                onClick={handleClick}
                className="flex items-center justify-between border border-solid border-[#00000033] px-[15px] py-[10px] bg-[#d9d9d980] rounded-lg xl:px-[30px] xl:py-[19px] cursor-pointer"
              >
                <div className="font-medium text-[0.6875rem] text-[#00000099] xl:text-[1.125rem]">
                  Sign Contract
                </div>

                <div>
                  <img src={sign} alt="sign icon" />
                </div>
              </div>
            )}
          </>
        )}
      </div>
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
