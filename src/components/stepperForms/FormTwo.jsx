import ContractInputForm from "../ContractFormInput";
import "../stepperForms/forms.css";
import dropdownarrow from "../../assets/svg/dropdownarrow.svg";
import { useEffect, useRef, useState } from "react";

const FormTwo = ({ onChange, value }) => {
  // Dropdown 
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select a location");
  const dropdownRef = useRef(null);

  // Toggle Dropdown 
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Option selection handler
  const handleLocationOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-[18px]">
        <div className="">
          <div className="text-lg font-semibold leading-normal">
            Role Details
          </div>
          <div
            className="text-[12px] font-medium leading-normal"
            style={{ color: "rgba(0, 0, 0, 0.40)" }}
          >
            Full-time Role
          </div>
        </div>
        <ContractInputForm
          htmlFor="role title"
          label="Role Title(Optional)"
          type="text"
          name="roleTitle"
          id="role title"
          placeholder=""
          value={value}
          onChange={onChange}
          required={true}
        />

        <ContractInputForm
          htmlFor="seniority level"
          label="seniority Level(Optional)"
          type="text"
          name="seniorityLevel"
          id="seniority level"
          placeholder=""
          value={value}
          onChange={onChange}
          required={true}
        />

        <div className="flex flex-col gap-1 xl:gap-4">
          <label
            htmlFor="scope of work"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Scope of Work *
          </label>
          <div className="select-container" ref={dropdownRef}>
            <div className="select-display h-10 p-3 xl:h-[60px]" onClick={toggleDropdown}>
              {selectedOption}
              <span className="custom-arrow">
                <img src={dropdownarrow} alt="" />
              </span>
            </div>
            {isOpen && (
              <div className="dropdown-menu">
                <div onClick={() => handleLocationOptionClick("Option 1")}>
                  Option 1
                </div>
                <div onClick={() => handleLocationOptionClick("Option 2")}>
                  Option 2
                </div>
                <div onClick={() => handleLocationOptionClick("Option 3")}>
                  Option 3
                </div>
              </div>
            )}
          </div>
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
            className="bg-transparent border outline-gray-400 rounded-lg p-3 text-[12px]"
            style={{ borderColor: "rgba(0, 0, 0, 0.20)" }}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
export default FormTwo;
