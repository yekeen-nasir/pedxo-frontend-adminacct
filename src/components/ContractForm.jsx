import leftarrorw from "../assets/svg/leftarrow.svg";
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
            className="flex mt-4 mb-9 mr-[45px] px-2 xl:m-0 
          xl:user-bg-clr xl:rounded-lg xl:w-[456px] xl:px-[45px] xl:py-[45px] xl:flex-col xl:gap-[45px] xl:order-1"
          >
            {steps.map((step, i) => (
              <div
              key={i}
              className={`step-item ${currentStep === i + 1 && "active"} ${
                (i + 1 < currentStep || complete) && "complete"
              }`}
            >
              <div className="step">{i + 1}</div>
              <p className="text-center text-[10px] font-medium leading-normal xl:text-2xl px-4 xl:px-0">
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

          <div className="xl:w-[731px] user-bg-clr mx-[21px] p-5 pb-[25px] rounded-lg lg:px-[70px] lg:pt-[51px] lg:pb-[29px] xl:order-0 xl:mx-0">
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
