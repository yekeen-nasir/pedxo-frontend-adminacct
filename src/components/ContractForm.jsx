import { useState, useEffect } from "react";
import "./Stepper.css";
import FormOne from "./stepperForms/FormOne";
import FormTwo from "./stepperForms/FormTwo";
import FormThree from "./stepperForms/FormThree";
import FormFour from "./stepperForms/FormFour";
import FormFive from "./stepperForms/FormFive";
import { Link } from "react-router-dom";
import axios from "axios";
import sendcontract from "../assets/svg/sendcontract.svg";
import { useGlobalContext } from "../Context";
import { FaArrowLeft } from "react-icons/fa";

const countriesUrl = "https://api.countrystatecity.in/v1/countries";
const statesUrl = "https://api.countrystatecity.in/v1/countries";

const ContractForm = ({ subHead, endDate, showSwitch }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  // const [formData, setFormData] = useState();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  // const [selectedOption, setSelectedOption] = useState({});
  const { setFormStepperData } = useGlobalContext();
  const { hasSignature } = useGlobalContext();

  const handleOptionSelect = (option) => {
    setFormStepperData(option);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(countriesUrl, {
          headers: {
            "X-CSCAPI-KEY":
              "OEVBRUJVQUhTaEpYMDdOcmtySGhWUW1rQ1A1V2VxMFlTQ1JoQzhTTQ==",
          },
        });
        const data = response.data;
        setCountries(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;

    const fetchStates = async () => {
      try {
        const response = await axios.get(
          `${statesUrl}/${selectedCountry}/states`,
          {
            headers: {
              "X-CSCAPI-KEY":
                "OEVBRUJVQUhTaEpYMDdOcmtySGhWUW1rQ1A1V2VxMFlTQ1JoQzhTTQ==",
            },
          }
        );
        const data = response.data;
        setStates(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchStates();
  }, [selectedCountry]);

  const steps = [
    "Personal Information",
    "Job Details",
    "Compensation Budget",
    "Review Contract",
  ];

  // const handleInputChange = (e) => {
  //   console.log(e.target.value);
  // };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <FormOne
              // value={formData}
              // onChange={handleInputChange}
              countries={countries}
              states={states}
              setStates={setStates}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          </div>
        );

      case 2:
        return (
          <div>
            <FormTwo
              // value={formData}
              // onChange={handleInputChange}
              subHead={subHead}
              endDate={endDate}
              showSwitch={showSwitch}
              onOptionSelect={handleOptionSelect}
            />
          </div>
        );

      case 3:
        return (
          <div>
            <FormThree
              // value={formData}
              // onChange={handleInputChange}
              selectedCountry={selectedCountry}
              onOptionSelect={handleOptionSelect}
            />
          </div>
        );

      case 4:
        return (
          <div>
            <FormFour
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              setComplete={setComplete}
              heading="Review and Sign Contract"
              hasSignature={hasSignature}
            />
          </div>
        );

      case 5:
        return (
          <div>
            <FormFive />
          </div>
        );

      case 6:
        return (
          <div>
            <FormFour
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              setComplete={setComplete}
              heading="Review and Sign Contract"
              hasSignature={hasSignature}
            />
          </div>
        );
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className=" p-4 w-full flex flex-col gap-10 pt-10">
      <div
        className="flex items-center gap-1 text-sm font-medium leading-normal pr-text-clr  xl:gap-3  "
        onClick={handlePrevious}
      >
        <FaArrowLeft size={18} />
        {currentStep === 1 ? (
          <Link to="/add-developer">Go back</Link>
        ) : (
          <span className="cursor-pointer">Go back</span>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <div className="space-y-3">
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

        <div className="flex-col flex md:flex-row gap-5 md:justify-between w-full">
          <div className="flex  user-bg-clr mb-3 md:mb-0 rounded-md h-fit md:p-8 px-8 p-2 flex-shrink-0  md:w-96 gap-4 md:flex-col md:order-2  items-center">
            {steps.map((step, i) => (
              <div key={i} className="flex w-full items-center gap-4">
                <p
                  className={`w-8 h-8 md:w-10 md:h-10 flex-shrink-0 flex items-center  justify-center rounded-full ${
                    currentStep >= i + 1
                      ? "bg-[#008000] text-white"
                      : "text-[#E1E2DD] ring-1 ring-[#E1E2DD]"
                  }`}
                >
                  {i + 1}
                </p>
                <p className=" hidden md:block text-center text-base truncate font-medium leading-normal ">
                  {step}
                </p>
              </div>
              // <div
              //   key={i}
              //   className={`step-item  ${currentStep === i + 1 && "active"} ${
              //     (i + 1 < currentStep || complete) && "complete"
              //   }`}
              // >
              //   <div className="step">{i + 1}</div>
              //   <p className="text-center text-[10px] font-medium leading-normal xl:text-2xl px-4 xl:px-0">
              //     {step}
              //   </p>
              // </div>
            ))}
          </div>

          <div className=" user-bg-clr  p-10 w-full rounded-lg ">
            <form onSubmit={handleFormSubmit}>
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContractForm;
