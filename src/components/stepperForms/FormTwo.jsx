import "../stepperForms/forms.css";
import dropdownarrow from "../../assets/svg/dropdownarrow.svg";
import close from "../../assets/svg/close.svg";
import { Switch } from "antd";
import { useEffect, useRef, useState } from "react";
import Dropdown from "../../Dropdown.json";
import { templateBenefits } from "../../data";
// import { useGlobalContext } from "../../Context";

const FormTwo = ({ subHead, endDate, showSwitch, onOptionSelect }) => {
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
  const [isDateSelected, setIsDateSelected] = useState(false);
  // const [contractStartDate, setContractStartDate] = useState("");
  // const [contractEndDate, setContractEndDate] = useState("");
  // const { formStepperData } = useGlobalContext();

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

    onOptionSelect({
      roleTitle: dropdown === "roleTitle" ? option : selectedOption.roleTitle,
      seniorityLevel:
        dropdown === "seniorityLevel" ? option : selectedOption.seniorityLevel,
      scopeOfWork:
        dropdown === "scopeOfWork" ? option : selectedOption.scopeOfWork,
      responsibility,
      contractStartDate,
      contractEndDate,
    });

    setIsOpen((prevState) => ({
      ...prevState,
      [dropdown]: false,
    }));
  };

  const handleResponsibilityChange = (e) => {
    const newResponsibility = e.target.value;
    setResponsibility(newResponsibility);

    // Pass the updated responsibility to onOptionSelect
    onOptionSelect((prevState) => ({
      ...prevState,
      responsibility: newResponsibility,
    }));

    console.log(responsibility);
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
      setResponsibility("");
      setIsTemplateUsed(false);
    }

    setSelectedOption((prevState) => ({
      ...prevState,
      [dropdown]: "",
    }));
  };

  const handleDateChange = (e, dateType) => {
    const newDate = e.target.value;
    setIsDateSelected(!!newDate);

    // if (dateType === "start") {
    //   setContractStartDate(newDate);
    //   console.log("Start Date:", newDate);

    //   onOptionSelect((prevState) => ({
    //     ...prevState,
    //     contractStartDate: newDate,
    //   }));
    // } else if (dateType === "end") {
    //   setContractEndDate(newDate);
    //   console.log("End Date:", newDate);

    //   onOptionSelect((prevState) => ({
    //     ...prevState,
    //     contractEndDate: newDate,
    //   }));
    // }
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
          <div className="">
            <input
              type="text"
              placeholder={selectedOption.roleTitle || "Select an option"}
              value={selectedOption.roleTitle}
              onClick={() => toggleDropdown("roleTitle")}
              className="relative w-full bg-transparent border text-left outline-gray-400 rounded-lg h-10 px-3 cursor-pointer xl:h-[60px] mt-1 xl:text-[16px]"
              style={{
                borderColor: "rgba(0, 0, 0, 0.20)",
              }}
            />
            {selectedOption.roleTitle && (
              <img
                src={close}
                alt="Cancel"
                onClick={() => clearSelection("roleTitle")}
                className="absolute top-[60%] right-12 cursor-pointer w-4"
              />
            )}

            <img
              src={dropdownarrow}
              alt=""
              onClick={() => toggleDropdown("roleTitle")}
              className={`absolute top-[70%] right-4 transform -translate-y-1/2 cursor-pointer text-blue-600 text-2xl transition-transform ${
                isOpen.roleTitle ? "rotate-180" : ""
              }`}
            />
          </div>

          {isOpen.roleTitle && (
            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {Dropdown.roleTitle.map((dropdown, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick("roleTitle", dropdown)}
                  className="px-4 py-2"
                >
                  {dropdown}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative text-[12px] xl:text-base" ref={dropdownRef}>
          <label
            htmlFor="seniorityLevel"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Seniority Level (Optional)
          </label>
          <div className="">
            <input
              type="text"
              placeholder={selectedOption.seniorityLevel || "Select an option"}
              value={selectedOption.seniorityLevel}
              onClick={() => toggleDropdown("seniorityLevel")}
              className="relative w-full bg-transparent border text-left outline-gray-400 rounded-lg h-10 px-3 cursor-pointer xl:h-[60px] mt-1 xl:text-[16px]"
              style={{
                borderColor: "rgba(0, 0, 0, 0.20)",
              }}
            />
            {selectedOption.seniorityLevel && (
              <img
                src={close}
                alt="Cancel"
                onClick={() => clearSelection("seniorityLevel")}
                className="absolute top-[60%] right-12 cursor-pointer w-4"
              />
            )}

            <img
              src={dropdownarrow}
              alt=""
              onClick={() => toggleDropdown("seniorityLevel")}
              className={`absolute top-[70%] right-4 transform -translate-y-1/2 cursor-pointer text-blue-600 text-2xl transition-transform ${
                isOpen.seniorityLevel ? "rotate-180" : ""
              }`}
            />
          </div>

          {isOpen.seniorityLevel && (
            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto ">
              {Dropdown.seniorityLevels.map((dropdown, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick("seniorityLevel", dropdown)}
                  className="px-4 py-2"
                >
                  {dropdown}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative text-[12px] xl:text-base" ref={dropdownRef}>
          <label
            htmlFor="scopOfWork"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Scope of Work template
          </label>
          <div className="">
            <input
              type="text"
              placeholder={selectedOption.scopeOfWork || "Select an option"}
              value={searchQuery || selectedOption.scopeOfWork}
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
                className="absolute top-[60%] right-12 cursor-pointer w-4"
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
                    Select, create and edit work scopes
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

        <div className="relative flex flex-col gap-1 xl:gap-4 ">
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
            // value={contractStartDate}
            onChange={(e) => handleDateChange(e, "start")}
            onFocus={(e) => e.target.showPicker()}
            min={minDate}
            className={`w-full bg-transparent border outline-gray-400 rounded-lg h-10 p-3 text-[12px] xl:h-[60px] xl:text-[16px] ${
              isDateSelected ? "date-selected" : " "
            }`}
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
            // value={contractEndDate}
            onChange={(e) => handleDateChange(e, "end")}
            onFocus={(e) => hasEndDate && e.target.showPicker()}
            min={minDate}
            onClick={showSwitch && toggleEndDate}
            className={`w-full bg-transparent border outline-gray-400 rounded-lg h-10 p-3 text-[12px] xl:h-[60px] xl:text-[16px]  ${
              isDateSelected ? "date-selected" : " "
            }  ${hasEndDate || !showSwitch ? "opacity-100" : "opacity-[0.2]"} 
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
            onChange={handleResponsibilityChange}
            className="bg-transparent border outline-gray-400 rounded-lg px-4 py-2 text-[12px] xl:text-[16px]"
            style={{ borderColor: "rgba(0, 0, 0, 0.20)" }}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
export default FormTwo;
