import "../stepperForms/forms.css";
import { Switch } from "antd";
import { useRef, useState } from "react";
import Dropdown from "../../Dropdown.json";
import { templateBenefits } from "../../data";
import { useSearchParams } from "react-router-dom";

const FormTwo = ({ subHead, endDate, formik }) => {
  const dropdownRef = useRef();
  // const [addedTemplate, setAddedTemplate] = useState("");
  const [searchParams] = useSearchParams();
  const contractType = searchParams.get("contractType") || null;
  const today = new Date().toISOString().split("T")[0];
  const [showSwitch, setShowSwitch] = useState(false);

  const handleSow = (e) => {
    formik.setFieldValue("scopeOfWork", e.target.value);
    handleSetTemplate(e.target.value);
  };

  const handleSetTemplate = (name) => {
    if (!name) return;
    const selected = Dropdown.scopeOfWork.explanation.find(
      (el) => el.title === name
    );
    if (selected) {
      const responsibilitiesText = selected.responsibilities
        .map((item) => `- ${item}`)
        .join("\n");
      formik.setFieldValue("description", responsibilitiesText);
    }
  };

  return (
    <div ref={dropdownRef}>
      <div className="flex flex-col gap-[18px]">
        <div>
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

        <div
          className="relative flex flex-col gap-2 text-[12px] xl:text-base"
          ref={dropdownRef}
        >
          <label
            htmlFor="roleTitle"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Role Title(Optional)
          </label>
          <select
            name="roleTitle"
            onBlur={formik.handleBlur}
            value={formik.values.roleTitle}
            onChange={formik.handleChange}
            className="appearance-none w-full cursor-pointer bg-transparent border border-[#00000033] outline-gray-400 rounded-lg h-10 px-3 text-[12px] xl:h-[60px] xl:text-[16px]"
          >
            <option value="">Select Role title...</option>
            {Dropdown.roleTitle.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <div
          className="relative flex flex-col gap-3 text-[12px] xl:text-base"
          ref={dropdownRef}
        >
          <label
            htmlFor="seniorityLevel"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Seniority Level (Optional)
          </label>
          <select
            name="seniorityLevel"
            onBlur={formik.handleBlur}
            value={formik.values.seniorityLevel}
            onChange={formik.handleChange}
            className="appearance-none w-full cursor-pointer bg-transparent border border-[#00000033] outline-gray-400 rounded-lg h-10 px-3 text-[12px] xl:h-[60px] xl:text-[16px]"
          >
            <option value="">Select seniority level..</option>
            {Dropdown.seniorityLevels.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <div className="relative text-[12px] xl:text-base" ref={dropdownRef}>
          <label
            htmlFor="scopOfWork"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Scope of explanation and tech stack requirements
          </label>

          <select
            name="scopeOfWork"
            onBlur={formik.handleBlur}
            value={formik.values.scopeOfWork}
            onChange={handleSow}
            className="appearance-none w-full cursor-pointer bg-transparent border border-[#00000033] outline-gray-400 rounded-lg h-10 px-3 text-[12px] xl:h-[60px] xl:text-[16px]"
          >
            <option value="">Choose template..</option>
            {Dropdown.scopeOfWork.options.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <div className="relative flex flex-col gap-1 xl:gap-4 ">
          <div className="flex justify-between">
            <label
              htmlFor="startDate"
              className="text-[12px] font-semibold leading-normal xl:text-[16px]"
            >
              Start Date *
            </label>
          </div>
          <input
            type="date"
            name="startDate"
            id="startDate"
            onBlur={formik.handleBlur}
            value={formik.values.startDate}
            onChange={formik.handleChange}
            min={today}
            className={`w-full bg-transparent border outline-gray-400 rounded-lg h-10 p-3 text-[12px] xl:h-[60px] xl:text-[16px]`}
            style={{
              borderColor: "rgba(0, 0, 0, 0.20)",
            }}
          />
        </div>

        <div className="relative flex flex-col gap-1 xl:gap-4  ">
          <div className="flex justify-between">
            <label
              htmlFor="endDate"
              className={`text-[12px] font-semibold leading-normal xl:text-[16px]  
                ${!showSwitch && "opacity-40"}
              `}
            >
              End Date
            </label>

            {contractType === "full-time" && (
              <Switch
                size="small"
                onChange={() => setShowSwitch(!showSwitch)}
              />
            )}
          </div>
          <input
            type="date"
            name="endDate"
            id="endDate"
            disabled={contractType === "full-time" && !showSwitch}
            value={formik.values.endDate}
            onChange={formik.handleChange}
            min={formik.values.startDate}
            className={`w-full disabled:opacity-50 bg-transparent border outline-gray-400 rounded-lg h-10 p-3 text-[12px] xl:h-[60px] xl:text-[16px] 
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
            name="description"
            onBlur={formik.handleBlur}
            id="scope of work"
            rows="7"
            value={formik.values.description}
            onChange={formik.handleChange}
            className="bg-transparent border outline-gray-400 rounded-lg px-4 py-2 text-[12px] xl:text-[16px]"
            style={{ borderColor: "rgba(0, 0, 0, 0.20)" }}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
export default FormTwo;
