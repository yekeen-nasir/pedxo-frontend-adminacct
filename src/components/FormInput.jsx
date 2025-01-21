import { useState } from "react";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

const FormInput = ({
  htmlFor,
  label,
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    if (type === "password")
      return (
        <div className="flex flex-col  w-full gap-3">
          <label htmlFor={htmlFor} className=" font-medium">
            {label}
          </label>
          <div className="flex focus-within:outline-gray-400 items-center border border-gray-400 p-3 rounded-lg">
            <input
              type={showPassword ? "text" : "password"}
              name={name}
              id={id}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              required={required}
              className=" w-full focus:outline-0 placeholder:capitalize outline-gray-400  "
            />
            <button type="button" className="flex-shrink-0" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <IoMdEye size={18} /> : <IoIosEyeOff size={18} />}
            </button>
          </div>
        </div>
      );

  return (
    <div className="flex flex-col w-full gap-3">
      <label htmlFor={htmlFor} className=" font-medium">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="border border-gray-400  placeholder:capitalize outline-gray-400 rounded-lg p-3 "
      />
    </div>
  );
};
export default FormInput;
