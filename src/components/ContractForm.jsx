import { useState, useEffect, useCallback } from "react";
import "./Stepper.css";
import FormOne from "./stepperForms/FormOne";
import FormTwo from "./stepperForms/FormTwo";
import FormThree from "./stepperForms/FormThree";
import FormFour from "./stepperForms/FormFour";
import FormFive from "./stepperForms/FormFive";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context";
import { FaArrowLeft } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import useGetCountries from "../features/countriesandstates/useGetCountries";
import useGetStates from "../features/countriesandstates/useGetStates";
import { useQueryClient } from "@tanstack/react-query";

const ContractForm = ({ subHead, endDate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("");
  const { countries, isLoading: loadingCountries } = useGetCountries();
  const { setFormStepperData } = useGlobalContext();
  const { states, loadingStates, refetch } = useGetStates(selectedCountry);

  useEffect(() => {
    queryClient.invalidateQueries(["states"]);
  }, [selectedCountry, queryClient]);

  const handleOptionSelect = (option) => {
    setFormStepperData(option);
  };

  const steps = [
    "Personal Information",
    "Job Details",
    "Compensation Budget",
    "Review Contract",
  ];

  const initialValues = {
    clientName: "",
    email: "",
    country: "",
    state: "",
    companyName: "",
    roleTitle: "", //Optional
    seniorityLevel: "",
    scopeOfWork: "",
    description: "",
    startDate: "",
    endDate: "",
    paymentRate: "",
    paymentFrequency: "",
    signature: "",
  };

  const handlePrevious = useCallback(() => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    else {
      navigate("/add-developer");
    }
  }, [currentStep, navigate]);

  useEffect(() => {
    window.history.pushState({ step: currentStep }, "");
  }, [currentStep]);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state && e.state.step) {
        setCurrentStep(e.state.step);
      } else {
        navigate("/add-developer");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  const validationSchema = Yup.object({
    clientName: Yup.string().required("Client name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    companyName: Yup.string().required("Company name is required"),
    scopeOfWork: Yup.string().required("Scope of work is required"),
    startDate: Yup.string().required("Start date is required"),
    description: Yup.string().required("Scope of work explanation is required"),
    paymentRate: Yup.number().required("Payment rate is required"),
    paymentFrequency: Yup.string().required("Payment frequency is required"),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      toast.success("Application sent Successfully");
    },
  });

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormOne
            formik={formik}
            isLoading={loadingCountries}
            countries={countries}
            loadingStates={loadingStates}
            states={states}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        );

      case 2:
        return (
          <div>
            <FormTwo
              formik={formik}
              subHead={subHead}
              endDate={endDate}
              onOptionSelect={handleOptionSelect}
            />
          </div>
        );

      case 3:
        return (
          <div>
            <FormThree
              formik={formik}
              selectedCountry={selectedCountry}
              onOptionSelect={handleOptionSelect}
            />
          </div>
        );

      case 4:
        return (
          <div>
            <FormFour
              formik={formik}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              signature={formik.values.signature}
              heading="Review and Sign Contract"
              hasSignature={Boolean(formik.values.signature)}
            />
          </div>
        );

      case 5:
        return <FormFive formik={formik} />;

      case 6:
        return (
          <div>
            <FormFour
              formik={formik}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              heading="Review and Sign Contract"
              signature={formik.values.signature}
              hasSignature={Boolean(formik.values.signature)}
            />
          </div>
        );
    }
  };

  const handleFormSubmit = (e) => {
    if (
      (currentStep === 6 && formik.values.signature) ||
      (currentStep === 4 && formik.values.signature)
    ) {
      console.log("ee");
      formik.handleSubmit(e);
    } else {
      e.preventDefault();
      setCurrentStep((prev) => prev + 1);
    }
  };

  const checkStepValidility = () => {
    switch (currentStep) {
      case 1:
        if (
          formik.values.clientName &&
          !formik.errors.clientName &&
          formik.values.companyName &&
          !formik.errors.companyName &&
          formik.values.country &&
          !formik.errors.country &&
          formik.values.email &&
          !formik.errors.email &&
          formik.values.state &&
          !formik.errors.state
        ) {
          return false;
        } else return true;
      case 2:
        if (
          formik.values.startDate &&
          formik.values.description &&
          formik.values.scopeOfWork
        ) {
          return false;
        } else return true;
      case 3:
        if (formik.values.paymentFrequency && formik.values.paymentRate) {
          return false;
        } else return true;
      case 4:
      case 5:
        return false; // Allow proceeding in later steps
      default:
        return true;
    }
  };

  return (
    <section className=" p-4 w-full flex flex-col gap-10 pt-10">
      <div
        className="flex items-center gap-1 text-sm font-medium leading-normal pr-text-clr  xl:gap-3  "
        onClick={handlePrevious}
      >
        <FaArrowLeft size={18} />

        <span className="cursor-pointer">Go back</span>
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
          <div className="flex  user-bg-clr mb-3 md:mb-0 rounded-md h-fit md:p-8 px-8 p-2 flex-shrink-0  lg:w-96 gap-4 md:flex-col md:order-2  items-center">
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
                <p className=" hidden md:block text-center text-sm lg:text-base truncate font-medium leading-normal ">
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
                {currentStep <= 3 && (
                  <button
                    disabled={checkStepValidility()}
                    type="submit"
                    className={`pr-bg-clr mt-[18px] disabled:opacity-50 disabled:cursor-not-allowed w-full rounded-lg text-white text-[0.75rem] py-[14px] lg:w-auto lg:mx-auto lg:px-[60px] xl:py-6 xl:text-xl xl:mt-[36px] 
                    
                    `}
                  >
                    Save and Continue
                  </button>
                )}

                {/* {currentStep === 6 && (
                  <button
                    type="submit"
                    className={`pr-bg-clr flex items-center justify-center mt-[18px] w-full rounded-lg text-white text-[0.75rem] py-[14px] lg:w-auto lg:mx-auto lg:px-[60px] xl:py-6 xl:text-xl xl:mt-[36px] 
                    
                    `}
                  >
                    Send Contract <img src={sendcontract} alt="send icon" />
                  </button>
                )} */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContractForm;
