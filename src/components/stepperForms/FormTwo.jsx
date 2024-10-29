import "../stepperForms/forms.css";
import dropdownarrow from "../../assets/svg/dropdownarrow.svg";
import { useEffect, useRef, useState } from "react";
import ContractFormInput from "../ContractFormInput";

const FormTwo = ({ onChange, value, subHead }) => {
  // Dropdown 1
  const [isOpenRole, setIsOpenRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const roleRef = useRef(null);

  // Dropdown 2
  const [isOpenSeniority, setIsOpenSeniority] = useState(false);
  const [selectedSeniority, setSelectedSeniority] = useState("");
  const seniorityRef = useRef(null);

  // Dropdown 3
  const [isOpenScope, setIsOpenScope] = useState(false);
  const [selectedScope, setSelectedScope] = useState("");
  const scopeRef = useRef(null);

  // Toggle Dropdown 1
  const toggleRoleDropdown = () => {
    setIsOpenRole((prev) => !prev);
  };

  // Toggle Dropdown 2
  const toggleSeniorityDropdown = () => {
    setIsOpenSeniority((prev) => !prev);
  };

  // Toggle Dropdown 3
  const toggleScopeDropdown = () => {
    setIsOpenScope((prev) => !prev);
  };

  // Option selection handlers 1
  const handleRoleOptionClick = (option) => {
    setSelectedRole(option);
    setIsOpenRole(false);
  };

  // Option selection handlers 2
  const handleSeniorityOptionClick = (option) => {
    setSelectedSeniority(option);
    setIsOpenSeniority(false);
  };

  // Option selection handlers 3
  const handleScopeOptionClick = (option) => {
    setSelectedScope(option);
    setIsOpenScope(false);
  };

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roleRef.current && !roleRef.current.contains(event.target)) {
        setIsOpenRole(false);
      }
      if (
        seniorityRef.current &&
        !seniorityRef.current.contains(event.target)
      ) {
        setIsOpenSeniority(false);
      }
      if (scopeRef.current && !scopeRef.current.contains(event.target)) {
        setIsOpenScope(false);
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

        <div className="flex flex-col gap-1 xl:gap-4">
          <label
            htmlFor="Role Title"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Role Title (Optional)
          </label>
          <div className="select-container" ref={roleRef}>
            <div
              className="select-display h-10 p-3 xl:h-[60px]"
              onClick={toggleRoleDropdown}
            >
              {selectedRole}
              <span className="custom-arrow">
                <img src={dropdownarrow} alt="" />
              </span>
            </div>
            {isOpenRole && (
              <div className="dropdown-menu xl:text-[16px]">
                <div onClick={() => handleRoleOptionClick("Option 1")}>
                  Option 1
                </div>
                <div onClick={() => handleRoleOptionClick("Option 2")}>
                  Option 2
                </div>
                <div onClick={() => handleRoleOptionClick("Option 3")}>
                  Option 3
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 xl:gap-4">
          <label
            htmlFor="Seniority Level"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Seniority Level (Optional)
          </label>
          <div className="select-container" ref={seniorityRef}>
            <div
              className="select-display h-10 p-3 xl:h-[60px]"
              onClick={toggleSeniorityDropdown}
            >
              {selectedSeniority}
              <span className="custom-arrow">
                <img src={dropdownarrow} alt="" />
              </span>
            </div>
            {isOpenSeniority && (
              <div className="dropdown-menu xl:text-[16px]">
                <div onClick={() => handleSeniorityOptionClick("Option 1")}>
                  Option 1
                </div>
                <div onClick={() => handleSeniorityOptionClick("Option 2")}>
                  Option 2
                </div>
                <div onClick={() => handleSeniorityOptionClick("Option 3")}>
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
            Scope of Work *
          </label>
          <div className="select-container" ref={scopeRef}>
            <div
              className="select-display h-10 p-3 xl:h-[60px]"
              onClick={toggleScopeDropdown}
            >
              {selectedScope}
              <span className="custom-arrow">
                <img src={dropdownarrow} alt="" />
              </span>
            </div>
            {isOpenScope && (
              <div className="dropdown-menu xl:text-[16px]">
                <div onClick={() => handleScopeOptionClick("Option 1")}>
                  Option 1
                </div>
                <div onClick={() => handleScopeOptionClick("Option 2")}>
                  Option 2
                </div>
                <div onClick={() => handleScopeOptionClick("Option 3")}>
                  Option 3
                </div>
              </div>
            )}
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

        <ContractFormInput
          htmlFor="endDate"
          label="End Date *"
          type="date"
          name="endDate"
          id="endDate"
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
