import ContractInputForm from "../ContractFormInput";
import "../stepperForms/forms.css";
import dropdownarrow from "../../assets/svg/dropdownarrow.svg";

const FormOne = ({ formik, countries, states, setSelectedCountry }) => {
  const handleCountryChange = (e) => {
    const selectedIso = e.target.value;
    const selected = countries.find((c) => c.iso2 === selectedIso);
    if (selected) {
      formik.setFieldValue("country", selected.name);
      setSelectedCountry(selectedIso);
    } else {
      setSelectedCountry("");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-[18px]">
        <div className="text-lg font-semibold leading-normal xl:text-2xl xl:mb-[18px]">
          Personal Information
        </div>

        <ContractInputForm
          label="Client Name *"
          type="text"
          name="clientName"
          id="clientName"
          placeholder="John Doe"
          error={Boolean(formik.errors.clientName)}
          errorMessage={formik.errors.clientName}
          onBlur={formik.handleBlur}
          value={formik.values.clientName}
          onChange={formik.handleChange}
          required={true}
        />

        <ContractInputForm
          label="Email *"
          type="email"
          name="email"
          id="email"
          placeholder="John@gmail.com"
          error={Boolean(formik.errors.email)}
          errorMessage={formik.errors.email}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          onChange={formik.handleChange}
          required={true}
        />

        {/* Country Dropdown */}
        <div className="flex flex-col gap-1 xl:gap-4">
          <div className="flex items-center gap-3">
            <label
              htmlFor="country"
              className="text-[12px] font-semibold leading-normal xl:text-[16px]"
            >
              Country *
            </label>
            {formik.errors.country && (
              <p className="text-sm text-red-500 italic">
                {formik.errors.country}
              </p>
            )}
          </div>
          <div className="relative">
            <select
              name="country"
              id="country"
              onChange={handleCountryChange}
              value={
                countries.find((c) => c.name === formik.values.country)?.iso2 ||
                ""
              }
              className="appearance-none w-full bg-transparent border border-[#00000033] outline-gray-400 rounded-lg h-10 px-3 text-[12px] xl:h-[60px] xl:text-[16px]"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.iso2}>
                  {country.name}
                </option>
              ))}
            </select>
            <div className="absolute top-[50%] right-4 transform -translate-y-1/2 pointer-events-none text-blue-600 text-2xl">
              <img src={dropdownarrow} alt="" />
            </div>
          </div>
        </div>

        {/* State Dropdown */}
        <div className="flex flex-col gap-1 xl:gap-4">
          <label
            htmlFor="state"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Region/Province/State *
          </label>
          <div className="relative">
            <select
              name="state"
              id="state"
              onChange={(e) => formik.setFieldValue("state", e.target.value)}
              value={formik.values.state}
              className="appearance-none w-full bg-transparent border border-[#00000033] outline-gray-400 rounded-lg h-10 px-3 text-[12px] xl:h-[60px] xl:text-[16px]"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
            <div className="absolute top-[50%] right-4 transform -translate-y-1/2 pointer-events-none text-blue-600 text-2xl">
              <img src={dropdownarrow} alt="dropdown_icon" />
            </div>
          </div>
        </div>

        {formik.values.country && formik.values.state && (
          <ContractInputForm
            htmlFor="companyName"
            label="Company Name *"
            type="text"
            name="companyName"
            id="companyName"
            placeholder="Enter company name"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            required={true}
          />
        )}
      </div>
    </div>
  );
};

export default FormOne;
