import ContractInputForm from "../ContractFormInput";
import "../stepperForms/forms.css";
import dropdownarrow from "../../assets/svg/dropdownarrow.svg";

const countriesUrl = "https://api.countrystatecity.in/v1/countries";
const statesUrl = "https://api.countrystatecity.in/v1/countries";

const FormOne = ({ onChange, value, states, setStates, selectedCountry, setSelectedCountry, countries }) => {
  
  const handleChange = (e) => {
    setSelectedCountry(e.target.value)
    setStates([])
  }

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
          onChange={onChange}
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
          onChange={onChange}
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
              onChange={(e) => handleChange(e)}
              value={selectedCountry}
              className="appearance-none w-full bg-transparent border outline-gray-400 rounded-lg h-10 px-3 text-[12px] xl:h-[60px] xl:text-[16px]"
              style={{ borderColor: "rgba(0, 0, 0, 0.20)" }}
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
              className="appearance-none w-full bg-transparent border outline-gray-400 rounded-lg h-10 px-3 text-[12px] xl:h-[60px] xl:text-[16px]"
              style={{ borderColor: "rgba(0, 0, 0, 0.20)" }}
            >
              <option value=""></option>
              {states.map((state) => {
                return (
                  <option key={state.id} value={state.id}>
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
      </div>
    </div>
  );
};
export default FormOne;
