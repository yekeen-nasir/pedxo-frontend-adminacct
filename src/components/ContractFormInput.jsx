const ContractFormInput = ({
  label,
  error,
  onBlur,
  value,
  name,
  onChange,
  errorMessage,
}) => {
  return (
    <div className="flex flex-col w-full gap-1 xl:gap-2">
      <div className="flex items-center gap-3">
        <label
          htmlFor={name}
          className="text-[12px] font-semibold leading-normal xl:text-[16px]"
        >
          {label}
        </label>
        {error && (
          <p className=" text-red-500 text-xs italic">{errorMessage}</p>
        )}
      </div>
      <input
        name={name}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border border-[#00000033] outline-gray-400 pl-3 rounded-lg h-10 text-[12px] xl:h-[60px] xl:text-[16px]"
      />
    </div>
  );
};
export default ContractFormInput;
