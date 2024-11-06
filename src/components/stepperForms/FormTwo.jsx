import "../stepperForms/forms.css";
import dropdownarrow from "../../assets/svg/dropdownarrow.svg";
import close from "../../assets/svg/close.svg";
import { Switch } from "antd";
import { useEffect, useRef, useState } from "react";
import Dropdown from "../../Dropdown.json";
import { templateBenefits } from "../../data";

const FormTwo = ({ onChange, value, subHead, endDate, showSwitch }) => {
  const dropdownRef = useRef();
  const [hasEndDate, setHasEndDate] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [responsibility, setResponsibility] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isTemplateUsed, setIsTemplateUsed] = useState(false);
  const [isOpen, setIsOpen] = useState({
    roleTitle: false,
    seniorityLevel: false,
    scopeOfWork: false,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = (dropdown) => {
    setIsOpen((prevState) => {
      const newState = {
        roleTitle: false,
        seniorityLevel: false,
        scopeOfWork: false,
      };

      newState[dropdown] = !prevState[dropdown];
      return newState;
    });
  };

  const handleOptionClick = (dropdown, option) => {
    setSelectedOption((prevState) => ({
      ...prevState,
      [dropdown]: option,
    }));
    setIsOpen((prevState) => ({
      ...prevState,
      [dropdown]: false,
    }));
  };

  const toggleEndDate = (e) => {
    if (!hasEndDate) {
      e.preventDefault();
    }
    return;
  };

  const handleSwitch = (checked) => {
    setHasEndDate(checked);
  };

  const handleTemplateClick = (roleTitle) => {
    const selectedRole = Dropdown.scopeOfWork.explanation.find(
      (item) => item.title === roleTitle
    );

    if (selectedRole) {
      const responsibilitiesList = selectedRole.responsibilities
        .map((responsibility) => `- ${responsibility}`)
        .join("\n");

      setResponsibility(responsibilitiesList);
      setIsTemplateUsed(true);

      setSelectedOption((prevState) => ({
        ...prevState,
        scopeOfWork: roleTitle,
      }));

      setIsOpen((prevState) => ({
        ...prevState,
        scopeOfWork: false,
      }));
    } else {
      console.log("No matching role found.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSelection = (dropdown) => {
    if (dropdown === "scopeOfWork" && isTemplateUsed) {
      setResponsibility(""); // Clear the text area
      setIsTemplateUsed(false); // Reset the flag
    }

    setSelectedOption((prevState) => ({
      ...prevState,
      [dropdown]: "",
    }));
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen({
          roleTitle: false,
          seniorityLevel: false,
          scopeOfWork: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

        <div className="relative text-[12px] xl:text-base" ref={dropdownRef}>
          <label
            htmlFor="roleTitle"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Role Title(Optional)
          </label>
          <button
            onClick={() => toggleDropdown("roleTitle")}
            className="w-full bg-transparent border text-left outline-gray-400 rounded-lg h-10 px-3 xl:h-[60px] mt-1"
            style={{
              borderColor: "rgba(0, 0, 0, 0.20)",
            }}
          >
            {selectedOption.roleTitle || "Select an option"}
            <img
              src={dropdownarrow}
              alt=""
              className={`absolute top-[70%] right-4 transform -translate-y-1/2 pointer-events-none text-blue-600 text-2xl transition-transform ${
                isOpen.roleTitle ? "rotate-180" : ""
              }`}
            />
          </button>
          {isOpen.roleTitle && (
            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {Dropdown.roleTitle.map((dropdown, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick("roleTitle", dropdown)}
                  className="px-4 py-2 cursor-pointer option-bg"
                >
                  {dropdown}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative text-[12px] xl:text-base" ref={dropdownRef}>
          <label
            htmlFor="roleTitle"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Seniority Level (Optional)
          </label>
          <button
            onClick={() => toggleDropdown("seniorityLevel")}
            className="w-full bg-transparent border text-left outline-gray-400 rounded-lg h-10 px-3 xl:h-[60px] mt-1 "
            style={{
              borderColor: "rgba(0, 0, 0, 0.20)",
            }}
          >
            {selectedOption.seniorityLevel || "Select an option"}
            <img
              src={dropdownarrow}
              alt=""
              className={`absolute top-[70%] right-4 transform -translate-y-1/2 pointer-events-none text-blue-600 text-2xl transition-transform ${
                isOpen.seniorityLevel ? "rotate-180" : ""
              }`}
            />
          </button>
          {isOpen.seniorityLevel && (
            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {Dropdown.seniorityLevels.map((dropdown, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick("seniorityLevel", dropdown)}
                  className="px-4 py-2 cursor-pointer option-bg"
                >
                  {dropdown}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative text-[12px] xl:text-base" ref={dropdownRef}>
          <label
            htmlFor="roleTitle"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Scope of Work template
          </label>
          <div className="">
            <input
              type="text"
              placeholder={selectedOption.scopeOfWork || "Select an option"}
              value={searchQuery}
              onChange={handleSearchChange}
              onClick={() => toggleDropdown("scopeOfWork")}
              className="relative w-full bg-transparent border text-left outline-gray-400 rounded-lg h-10 px-3 cursor-pointer xl:h-[60px] mt-1 xl:text-[16px]"
              style={{
                borderColor: "rgba(0, 0, 0, 0.20)",
              }}
            />
            {selectedOption.scopeOfWork && (
              <img
                src={close}
                alt="Cancel"
                onClick={() => clearSelection("scopeOfWork")}
                className="absolute top-[55%] right-12 cursor-pointer w-4"
              />
            )}

            <img
              src={dropdownarrow}
              alt=""
              onClick={() => toggleDropdown("scopeOfWork")}
              className={`absolute top-[70%] right-4 transform -translate-y-1/2 cursor-pointer text-blue-600 text-2xl transition-transform ${
                isOpen.scopeOfWork ? "rotate-180" : ""
              }`}
            />
          </div>

          {isOpen.scopeOfWork && (
            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              <div className="flex flex-col gap-2 px-4 py-2 font-semibold lg:flex-row lg:justify-between text-[10px]">
                <div>
                  <div>USE AUTOMATED SCOPE OF WORK TEMPLATES</div>
                  <div className="" style={{ color: "rgba(0, 0, 0, 0.70)" }}>
                    Select, create and manage work scopes
                  </div>
                </div>
                <div>
                  <div className="flex flex-col  lg:flex-row lg:gap-2">
                    {templateBenefits.map((item) => (
                      <div key={item.id} className="flex items-center ">
                        <span>{item.text}</span>
                        <img
                          src={item.icon}
                          alt="checked icon"
                          className="w-4"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="" style={{ color: "rgba(0, 0, 0, 0.70)" }}>
                    Click on a scope of work template to use it
                  </div>
                </div>
              </div>

              {Dropdown.scopeOfWork.options
                .filter((option) =>
                  option.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((dropdown, index) => (
                  <div key={index} className="">
                    <div className="flex flex-col gap-2 px-4 py-2 cursor-pointer option-bg md:flex-row md:justify-between">
                      <li
                        onClick={() =>
                          handleOptionClick("scopeOfWork", dropdown)
                        }
                      >
                        {dropdown}
                      </li>
                      {index !== 0 && (
                        <li
                          onClick={() => handleTemplateClick(dropdown)}
                          className="rounded-[20px] bg-red-500 user-bg-clr px-[21px] py-[2px]  max-w-max"
                        >
                          Use Template
                        </li>
                      )}
                    </div>
                  </div>
                ))}
            </ul>
          )}
        </div>

        <div className="relative flex flex-col gap-1 xl:gap-4  ">
          <div className="flex justify-between">
            <label
              htmlFor="startDate"
              className="text-[12px] font-semibold leading-normal xl:text-[16px]"
            >
              Start Date
            </label>
          </div>
          <input
            type="date"
            name="startDate"
            id="startDate"
            // value={value}
            // onChange={onChange}
            min={minDate}
            required
            className="w-full bg-transparent border outline-gray-400 rounded-lg h-10 p-3 text-[12px] xl:h-[60px] xl:text-[16px] "
            style={{
              borderColor: "rgba(0, 0, 0, 0.20)",
            }}
          />
        </div>

        <div className="relative flex flex-col gap-1 xl:gap-4  ">
          <div className="flex justify-between">
            <label
              htmlFor="endDate"
              className={`text-[12px] font-semibold leading-normal xl:text-[16px]  ${
                hasEndDate || !showSwitch ? "opacity-100" : "opacity-[0.2]"
              }
           
              `}
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
            min={minDate}
            onClick={showSwitch && toggleEndDate}
            className={`w-full bg-transparent border outline-gray-400 rounded-lg h-10 p-3 text-[12px] xl:h-[60px] xl:text-[16px]  ${
              hasEndDate || !showSwitch ? "opacity-100" : "opacity-[0.2]"
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
            value={responsibility}
            onChange={(e) => setResponsibility(e.target.value)}
            className="bg-transparent border outline-gray-400 rounded-lg p-3 text-[12px] xl:text-[16px]"
            style={{ borderColor: "rgba(0, 0, 0, 0.20)" }}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
export default FormTwo;
