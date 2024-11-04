import ContractInputForm from "../ContractFormInput";
import "../stepperForms/forms.css";
import dropdownarrow from "../../assets/svg/dropdownarrow.svg";
import { useEffect, useRef, useState } from "react";

const FormFour = ({ onChange, value }) => {
  // Dropdown 1
  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select a location");
  const locationRef = useRef(null);

  // Dropdown 2
  const [isOpenRegion, setIsOpenRegion] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("Select a region");
  const regionRef = useRef(null);

  // Toggle Dropdown 1
  const toggleLocationDropdown = () => {
    setIsOpenLocation((prev) => !prev);
  };

  // Toggle Dropdown 2
  const toggleRegionDropdown = () => {
    setIsOpenRegion((prev) => !prev);
  };

  // Option selection handlers
  const handleLocationOptionClick = (option) => {
    setSelectedLocation(option);
    setIsOpenLocation(false);
  };

  const handleRegionOptionClick = (option) => {
    setSelectedRegion(option);
    setIsOpenRegion(false);
  };

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setIsOpenLocation(false);
      }
      if (regionRef.current && !regionRef.current.contains(event.target)) {
        setIsOpenRegion(false);
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
        <div className="text-lg font-semibold leading-normal">
          Personal Information
        </div>
        <ContractInputForm
          htmlFor="client name"
          label="Client Name *"
          type="text"
          name="clientName"
          id="client name"
          placeholder="John Doe"
          value={value}
          onChange={onChange}
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
        />

        <div className="flex flex-col gap-1  xl:gap-4">
          <label
            htmlFor="location"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Location *
          </label>
          <div className="select-container" ref={locationRef}>
            <div className="select-display" onClick={toggleLocationDropdown}>
              {selectedLocation}
              <span className="custom-arrow">
                <img src={dropdownarrow} alt="" />
              </span>
            </div>
            {isOpenLocation && (
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
            htmlFor="location"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Region/Province/State *
          </label>
          <div className="select-container" ref={regionRef}>
            <div className="select-display" onClick={toggleRegionDropdown}>
              {selectedRegion}
              <span className="custom-arrow">
                <img src={dropdownarrow} alt="" />
              </span>
            </div>
            {isOpenRegion && (
              <div className="dropdown-menu">
                <div onClick={() => handleRegionOptionClick("Option 1")}>
                  Option 1
                </div>
                <div onClick={() => handleRegionOptionClick("Option 2")}>
                  Option 2
                </div>
                <div onClick={() => handleRegionOptionClick("Option 3")}>
                  Option 3
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormFour;
