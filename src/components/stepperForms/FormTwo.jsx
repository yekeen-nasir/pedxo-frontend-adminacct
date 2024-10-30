import "../stepperForms/forms.css";
import dropdownarrow from "../../assets/svg/dropdownarrow.svg";
import ContractFormInput from "../ContractFormInput";
import { Switch } from "antd";
import { useState } from "react";

const FormTwo = ({ onChange, value, subHead, endDate, showSwitch }) => {
  const [hasEndDate, setHasEndDate] = useState(false);

  const toggleEndDate = (e) => {
    if (!hasEndDate) {
      e.preventDefault();
    }
    return;
  };

  const handleSwitch = (checked) => {
    setHasEndDate(checked);
  };

  return (
    <div>
      <div className="flex flex-col gap-[18px]">
        <div className="">
          <div className="text-lg font-semibold leading-normal xl:text-2xl">
            Role Details
          </div>
          <div
            className="text-[12px] font-medium leading-normal xl:text-[16px]"
            style={{ color: "rgba(0, 0, 0, 0.50)" }}
          >
            {subHead}
          </div>
        </div>

        <div className="relative flex flex-col gap-1 xl:gap-4">
          <label
            htmlFor="roleTitle"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Role Title(Optional)
          </label>
          <select
            name="roleTitle"
            id="roleTitle"
            className="w-full bg-transparent border outline-gray-400 rounded-lg h-10 px-[30px] text-[12px] xl:h-[60px] xl:text-[16px] appearance-none"
            style={{
              borderColor: "rgba(0, 0, 0, 0.20)",
            }}
          >
            <option value=""></option>
            <option className="w-full max-w-full" value="Monthly">
              Monthly
            </option>
            <option value="Bi-weekly">Bi-weekly</option>
            <option value="Weekly">Weekly</option>
          </select>
          <div className="absolute top-[70%] right-4 transform -translate-y-1/2 pointer-events-none text-blue-600 text-2xl ">
            <img src={dropdownarrow} alt="" />
          </div>
        </div>

        <div className="relative flex flex-col gap-1 xl:gap-4">
          <label
            htmlFor="seniorityLevel"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Seniority Level (Optional)
          </label>
          <select
            name="seniorityLevel"
            id="seniorityLevel"
            className="w-full bg-transparent border outline-gray-400 rounded-lg h-10 px-[30px] text-[12px] xl:h-[60px] xl:text-[16px] appearance-none"
            style={{
              borderColor: "rgba(0, 0, 0, 0.20)",
            }}
          >
            <option value=""></option>
            <option className="w-full max-w-full" value="Monthly">
              Monthly
            </option>
            <option value="Bi-weekly">Bi-weekly</option>
            <option value="Weekly">Weekly</option>
          </select>
          <div className="absolute top-[70%] right-4 transform -translate-y-1/2 pointer-events-none text-blue-600 text-2xl ">
            <img src={dropdownarrow} alt="" />
          </div>
        </div>

        <div className="relative flex flex-col gap-1 xl:gap-4">
          <label
            htmlFor="scopeOfWorkTemplate"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Scope of Work template
          </label>
          <select
            name="scopeOfWorkTemplate"
            id="scopeOfWorkTemplate"
            className="w-full bg-transparent border outline-gray-400 rounded-lg h-10 px-[30px] text-[12px] xl:h-[60px] xl:text-[16px] appearance-none"
            style={{
              borderColor: "rgba(0, 0, 0, 0.20)",
            }}
          >
            <option value=""></option>
            <option className="w-full max-w-full" value="Monthly">
              Monthly
            </option>
            <option value="Bi-weekly">Bi-weekly</option>
            <option value="Weekly">Weekly</option>
          </select>
          <div className="absolute top-[70%] right-4 transform -translate-y-1/2 pointer-events-none text-blue-600 text-2xl ">
            <img src={dropdownarrow} alt="" />
          </div>
        </div>

        <ContractFormInput
          htmlFor="startDate"
          label="Start Date *"
          type="date"
          name="startDate"
          id="startDate"
          placeholder=""
          value={value}
          onChange={onChange}
          required={true}
        />

        <div className="relative flex flex-col gap-1 xl:gap-4  ">
          <div className="flex justify-between">
            <label
              htmlFor="endDate"
              className={`text-[12px] font-semibold leading-normal xl:text-[16px]  ${
                hasEndDate ? "opacity-100" : "opacity-[0.2]"
              } `}
            >
              {endDate}
            </label>
            {showSwitch && <Switch size="small" onChange={handleSwitch} />}
          </div>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={value}
            onChange={onChange}
            required={true}
            onClick={toggleEndDate}
            className={`w-full bg-transparent border outline-gray-400 rounded-lg h-10 p-3 text-[12px] xl:h-[60px] xl:text-[16px]  ${
              hasEndDate ? "opacity-100" : "opacity-[0.2]"
            }
        
            `}
            style={{
              borderColor: "rgba(0, 0, 0, 0.20)",
            }}
          />
        </div>

        <div className="flex flex-col gap-1 xl:gap-4">
          <label
            htmlFor="scope of work"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Explanation of Scope of Work *
          </label>
          <textarea
            name="scopeOfWorkExplained"
            id="scope of work"
            rows="7"
            className="bg-transparent border outline-gray-400 rounded-lg p-3 text-[12px] xl:text-[16px]"
            style={{ borderColor: "rgba(0, 0, 0, 0.20)" }}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
export default FormTwo;
