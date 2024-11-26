import { useState } from "react";
import leftarrorw from "../assets/svg/leftarrow.svg";
import sendcontract from "../assets/svg/sendcontract.svg";
import { Link } from "react-router-dom";
import document from "../assets/svg/document.svg"

import FormFour from "../components/stepperForms/FormFour";

const AgreementContract = () => {
  // const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <FormFour
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              setComplete={setComplete}
              heading="Mike Santos Contract"
            />
          </div>
        );
    }
  };

  // const steps = [
  //   "Personal Information",
  //   "Job Details",
  //   "Compensation Budget",
  //   "Review Contract",
  // ];

  return (
    <section className="xl:flex xl:justify-center font-poppins">
      {/* <h1>Agreement ID: {id}</h1> */}
      <div className=" mt-[50px] mb-[61px]">
        <div className="flex justify-between mx-[21px] xl:mx-0">
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
          <img src={document} alt="document" className="md:hidden" />
        </div>

        <div className="flex flex-col gap-[19px] mt-[45px] md:mx-[143px] xl:flex-row xl:gap-[39px] xl:mt-[75px]">
          <div className="xl:order-1 flex flex-col gap-3">
            <div
              className="flex flex-col gap-[15px] px-5 py-[18px] user-bg-clr rounded-lg mx-[21px] text-[0.75rem] font-medium max-w-[454px] xl:gap-[21px] xl:pl-[50px] xl:pr-[38px] xl:py-[52px] xl:text-[1.125rem] "
            >
              <div className="text-base font-semibold xl:text-[2.3125rem] xl:leading-normal">Total Amount Paid : $20,000</div>
              <div className=""><span>Pay Schedule:</span> <span className="font-semibold">BiWeekly</span></div>
              <div className="">Pay Rate:  <span className="font-semibold">$5,000</span></div>
              <div className="">Pay Period: <span className="font-semibold">Jul 16, 2024 - Jul 29, 2024</span></div>
              <div className="">Due by  <span className="font-semibold">Aug 29, 2023 at 11:00pm</span></div>
            </div>
            
          </div>

          <div className="xl:w-[731px] user-bg-clr mx-[21px] p-5 pb-[25px] rounded-lg lg:px-[70px] lg:pt-[51px] lg:pb-[29px] xl:order-0 xl:mx-0">
            {/* <form onSubmit={handleFormSubmit}> */}
            <div>{renderStep()}</div>

            <div className="lg:flex lg:justify-center">
              <button
                type="submit"
                className={`pr-bg-clr mt-[18px] w-full rounded-lg text-white text-[0.75rem] py-[14px] lg:w-auto lg:mx-auto lg:px-[60px] xl:py-6 xl:text-xl xl:mt-[36px] ${
                  currentStep === 4 || currentStep === 5 ? "hidden" : "block"
                } `}
                onClick={() => {
                  currentStep === 6
                    ? setComplete(true)
                    : setCurrentStep((prev) => prev + 1);
                }}
              >
                {currentStep === 6 ? (
                  <div className="flex items-center">
                    Send Contract <img src={sendcontract} alt="send icon" />
                  </div>
                ) : (
                  "Save and Continue"
                )}
              </button>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </section>
  );
};
export default AgreementContract;

// {/* <div
//               className="flex mb-9 mr-[45px] px-2 xl:m-0
//           xl:user-bg-clr xl:rounded-lg xl:w-[456px] xl:px-[45px] xl:py-[45px] xl:flex-col xl:gap-[45px] "
//             >
//               {/* {steps.map((step, i) => (
//               <div
//                 key={i}
//                 className={`step-item  ${currentStep === i + 1 && "active"} ${
//                   (i + 1 < currentStep || complete) && "complete"
//                 }`}
//               >
//                 <div className="step">{i + 1}</div>
//                 <p className="text-center text-[10px] font-medium leading-normal xl:text-2xl px-4 xl:px-0">
//                   {step}
//                 </p>
//               </div>
//             ))} */}
//             </div> */}
