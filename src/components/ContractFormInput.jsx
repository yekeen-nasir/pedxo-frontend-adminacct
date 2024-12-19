const ContractFormInput = ({
  htmlFor,
   label,
  ...props
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
         
          {...props}
          className="w-full bg-transparent border border-[#00000033] outline-gray-400 pl-3 rounded-lg h-10 text-[12px] xl:h-[60px] xl:text-[16px]"
          
        />
      </div>
    </div>
  );
};
export default ContractFormInput;
