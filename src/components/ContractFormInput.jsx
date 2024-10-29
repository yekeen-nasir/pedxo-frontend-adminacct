const ContractFormInput = ({
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
  return (
    <div>
      <div className="flex flex-col gap-1 xl:gap-4">
        <label
          htmlFor={htmlFor}
          className="text-[12px] font-semibold leading-normal xl:text-[16px]"
        >
          {label}
        </label>
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent border outline-gray-400 rounded-lg h-10 p-3 text-[12px] xl:h-[60px] xl:text-[16px]"
          style={{ borderColor: "rgba(0, 0, 0, 0.20)" }}
        />
      </div>
    </div>
  );
};
export default ContractFormInput;
