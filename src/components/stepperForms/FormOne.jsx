import ContractInputForm from "../ContractFormInput";
import "../stepperForms/forms.css";
import dropdownarrow from "../../assets/svg/dropdownarrow.svg";
import { useState } from "react";

const FormOne = ({
  // onChange,
  value,
  states,
  setStates,
  selectedCountry,
  setSelectedCountry,
  countries,
}) => {
  const [selectedState, setSelectedState] = useState("");
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");

  const isVisible = clientName && email && selectedCountry && selectedState;

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setStates([]);
    setSelectedState("");
    console.log(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-col gap-[18px]">
        <div className="text-lg font-semibold leading-normal xl:text-2xl xl:mb-[18px]">
          Personal Information
        </div>
        <ContractInputForm
          htmlFor="clientName"
          label="Client Name *"
          type="text"
          name="clientName"
          id="clientName"
          placeholder="John Doe"
          value={value}
          onChange={(e) => {
            // onChange(e);
            setClientName(e.target.value);
          }}
          required={true}
        />

        <ContractInputForm
          htmlFor="email"
          label="Email *"
          type="email"
          name="email"
          id="email"
          placeholder="John@gmail.com"
          value={value}
          onChange={(e) => {
            // onChange(e);
            setEmail(e.target.value);
          }}
          required={true}
        />

        <div className="flex flex-col gap-1 xl:gap-4">
          <label
            htmlFor="country"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Country *
          </label>
          <div className="relative ">
            <select
              name="country"
              id="country"
              onChange={handleCountryChange}
              value={selectedCountry}
              className="appearance-none w-full bg-transparent border border-[#00000033] outline-gray-400 rounded-lg h-10 px-3 text-[12px] xl:h-[60px] xl:text-[16px]"
            >
              <option value=""></option>
              {countries.map((country) => {
                return (
                  <option key={country.id} value={country.iso2}>
                    {country.name}
                  </option>
                );
              })}
            </select>
            <div className="absolute top-[50%] right-4 transform -translate-y-1/2 pointer-events-none text-blue-600 text-2xl ">
              <img src={dropdownarrow} alt="" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 xl:gap-4">
          <label
            htmlFor="state"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Region/Province/State *
          </label>
          <div className="relative ">
            <select
              name="state"
              id="state"
              onChange={(e) => setSelectedState(e.target.value)}
              value={selectedState}
              className="appearance-none w-full bg-transparent border border-[#00000033] outline-gray-400 rounded-lg h-10 px-3 text-[12px] xl:h-[60px] xl:text-[16px]"
            >
              <option value=""></option>
              {states.map((state) => {
                return (
                  <option key={state.id} value={state.iso2}>
                    {state.name}
                  </option>
                );
              })}
            </select>
            <div className="absolute top-[50%] right-4 transform -translate-y-1/2 pointer-events-none text-blue-600 text-2xl ">
              <img src={dropdownarrow} alt="" />
            </div>
          </div>
        </div>

        {isVisible && (
          <ContractInputForm
            htmlFor="text"
            label="Company Name *"
            type="text"
            name="text"
            id="text"
            placeholder=""
            // value={value}
            // onChange={(onChange, handleChange)}
            required={true}
          />
        )}
      </div>
    </div>
  );
};
export default FormOne;
