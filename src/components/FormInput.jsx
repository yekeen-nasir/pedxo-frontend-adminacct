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
  return (
    <div>
      <div className="flex flex-col mt-6">
        <label htmlFor={htmlFor} className="mb-[11px] font-medium">
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
          className="border border-gray-400 outline-gray-400 rounded-lg p-3 "
        />
      </div>
    </div>
  );
};
export default FormInput;
