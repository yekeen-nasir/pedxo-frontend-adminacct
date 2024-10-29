import leftarrorw from "../assets/svg/leftarrow.svg";
import { useState } from "react";
import "./Stepper.css";
import FormOne from "./stepperForms/FormOne";
import FormTwo from "./stepperForms/FormTwo";
import FormThree from "./stepperForms/FormThree";
import FormFour from "./stepperForms/FormFour";
import { Link } from "react-router-dom";

const ContractForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [formData, setFormData] = useState();

  const steps = [
    "Personal Information",
    "Job Details",
    "Compensation Budget",
    "Review Contract",
  ];

  const handleInputChange = (e) => {
    console.log(e.target.value);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <FormOne value={formData} onChange={handleInputChange}   />
          </div>
        );

      case 2:
        return (
          <div>
            <FormTwo value={formData} onChange={handleInputChange} />
          </div>
        );

      case 3:
        return (
          <div>
            <FormThree value={formData} onChange={handleInputChange} />
          </div>
        );

      case 4:
        return (
          <div>
            <FormFour value={formData} onChange={handleInputChange} />
          </div>
        );
    }
  };

  return (
    <section className="xl:flex xl:justify-center">
      <div className=" mt-[50px] mb-[61px]">
        <div className="mx-[21px] xl:mx-0">
          <div
            className="flex items-center gap-1 font-medium leading-normal pr-text-clr md:ml-24 xl:gap-3 xl:text-2xl "
            onClick={handlePrevious}
          >
            <img src={leftarrorw} alt="arrow" className="xl:w-[33px]" />
            {currentStep === 1 ? (
              <Link to="/dashboard/add-developer">Go back</Link>
            ) : (
              <span className="cursor-pointer">Go back</span>
            )}
          </div>

          <div className="mt-[45px] md:mx-[143px] xl:mb-[30px] xl:mt-[75px]">
            <h3 className="text-xl leading-normal font-bold xl:text-[29px]">
              Preparing a contract 
            </h3>
            <p
              className="text-[12px] font-medium leading-normal xl:w-[428px] xl:text-[16px]"
              style={{ color: "rgba(0, 0, 0, 0.60)" }}
            >
              Input the required details to customize your contract. Ensure all
              fields are complete for accuracy.
            </p>
          </div>
        </div>

        <div className="md:mx-[143px] xl:flex xl:gap-[39px]">
          <div
            className="flex  mt-4 mb-9 mr-[45px] px-2 xl:m-0 
          xl:user-bg-clr xl:rounded-lg xl:w-[456px] xl:max-h-max xl:px-[45px] xl:py-[45px] xl:flex-col xl:gap-[45px] xl:order-1"
          >
            {steps.map((step, i) => (
              <div
                key={i}
                className={`step-item  ${currentStep === i + 1 && "active"} ${
                  (i + 1 < currentStep || complete) && "complete"
                }`}
              >
                <div className="step">{i + 1}</div>
                <p className="text-center text-[10px] font-medium leading-normal xl:text-2xl px-4 xl:px-0">
                  {step}
                </p>
              </div>
            ))}
          </div>

          {/* xl:w-[731px] */}
          <div className="xl:w-[731px] user-bg-clr mx-[21px] p-5 pb-[25px] rounded-lg lg:px-[70px] lg:pt-[51px] lg:pb-[29px] xl:order-0 xl:mx-0">
            <form>
              <div>{renderStep()}</div>

              <div className="lg:flex lg:justify-center">
                <button
                  className="pr-bg-clr mt-[18px] w-full rounded-lg text-white text-[12px] py-[14px] lg:w-auto lg:mx-auto lg:px-[60px] xl:py-6 xl:text-xl xl:mt-[36px]"
                  onClick={() => {
                    currentStep === steps.length
                      ? setComplete(true)
                      : setCurrentStep((prev) => prev + 1);
                  }}
                >
                  {currentStep === steps.length
                    ? "Finish"
                    : "Save and Continue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContractForm;
