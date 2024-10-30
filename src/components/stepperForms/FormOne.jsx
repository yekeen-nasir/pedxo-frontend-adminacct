import ContractInputForm from "../ContractFormInput";
import "../stepperForms/forms.css";
import dropdownarrow from "../../assets/svg/dropdownarrow.svg";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils";

const FormOne = ({ onChange, value }) => {
  const result = useQuery({
    queryKey: ["tasks"],
    queryFn: () => customFetch.get("/"),
  });

  console.log(result);

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
              className="appearance-none w-full bg-transparent border outline-gray-400 rounded-lg h-10 p-3 text-[12px] xl:h-[60px] xl:text-[16px]"
              style={{ borderColor: "rgba(0, 0, 0, 0.20)" }}
            >
              <option value=""></option>
              {result.data.data.map((country, i) => {
                return (
                  <option key={i} value={country.name.common}>
                    {country.name.common}
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
              className="appearance-none w-full bg-transparent border outline-gray-400 rounded-lg h-10 p-3 text-[12px] xl:h-[60px] xl:text-[16px]"
              style={{ borderColor: "rgba(0, 0, 0, 0.20)" }}
            >
              <option value=""></option>
              <option value="Monthly">Monthly</option>
              <option value="Monthly">Monthly</option>
              <option value="Monthly">Monthly</option>
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
