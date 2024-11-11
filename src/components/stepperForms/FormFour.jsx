import { useState } from "react";
import sign from "../../assets/svg/sign.svg";
import FormFive from "./FormFive";
import { useGlobalContext } from "../../Context";

const FormFour = ({ currentStep, setCurrentStep, setComplete }) => {
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);

  const { signature } = useGlobalContext();

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
              Review and Sign Contract
            </div>

            <div
              className="bg-white rounded-lg px-10 pt-[53px] text-[0.625rem] xl:text-[1.125rem]"
              style={{
                border: "1px solid rgba(0, 0, 0, 0.20)",
              }}
            >
              <div className="flex justify-between mb-[45px]">
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

              <div className={`mb-[39px] ${signature ? "block" : "hidden"} `}>
                <div
                  className="w-full h-[0.5px] bg-red-500"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.30)" }}
                ></div>
                <div className="mt-[39px] max-w-[100px] mx-auto">
                {signature && <img src={signature} alt="user signature" />}
                </div>
              </div>
            </div>

            <div
              onClick={handleClick}
              className="flex items-center justify-between px-[15px] py-[10px] bg rounded-lg xl:px-[30px] xl:py-[19px] cursor-pointer"
              style={{
                backgroundColor: "rgba(217, 217, 217, 0.50)",
                border: "1px solid rgba(0, 0, 0, 0.20)",
              }}
            >
              <div
                className="font-medium text-[0.6875rem] xl:text-[1.125rem]"
                style={{ color: "rgba(0, 0, 0, 0.60)" }}
              >
                Sign Contract
              </div>

              <div>
                <img src={sign} alt="sign icon" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default FormFour;
