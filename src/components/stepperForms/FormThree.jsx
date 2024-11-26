import "../stepperForms/forms.css";
import dropdownarrow from "../../assets/svg/dropdownarrow.svg";

const FormTwo = ({ selectedCountry}) => {

  return (
    <div>
      <div className="flex flex-col gap-[18px]">
        <div className="text-lg font-semibold leading-normal">
          Compensation and Budget
        </div>

        <div className="flex flex-col gap-1 xl:gap-4 relative">
          <label
            htmlFor="paymentRate"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Payment Rate *
          </label>
          <div className="relative">
            <div
              className="py-[15px] pl-[19px] h-full rounded-lg pointer-events-none absolute inset-y-0 left-0  flex items-center pr-[14px]  xl:pl-[37px] xl:w-[115px]"
              style={{
                backgroundColor: "rgba(217, 217, 217, 0.87)",
                border: "1px solid rgba(0, 0, 0, 0.30",
              }}
            >
              <span className="text-[12px] font-semibold xl:text-xl">{selectedCountry === "NG" ? "NGN" : "USD"}</span>
            </div>
            <input
              type="number"
              name="paymentRate "
              id="paymentRate "
              // value={value}
              // onChange={onChange}
              className="w-full bg-transparent border outline-gray-400 rounded-lg h-10 p-3 pl-20 text-[12px] xl:pl-40 xl:h-[60px] xl:text-[16px]"
              style={{
                borderColor: "rgba(0, 0, 0, 0.20)",
              }}
            />
          </div>
        </div>

        
        <div className="relative flex flex-col gap-1 xl:gap-4">
          <label
            htmlFor="paymentFrequency"
            className="text-[12px] font-semibold leading-normal xl:text-[16px]"
          >
            Payment Frequency *
          </label>
          <select
            name="paymentFrequency"
            id="paymentFrequency"
            className="w-full bg-transparent border outline-gray-400 rounded-lg h-10 px-[30px] text-[12px] xl:h-[60px] xl:text-[16px] appearance-none"
            style={{
              borderColor: "rgba(0, 0, 0, 0.20)",
            }}
          >
            <option value=""></option>
            <option className="w-full max-w-full" value="Monthly">
              Monthly
            </option>
            <option value="Bi-weekly">Bi-weekly</option>
            <option value="Weekly">Weekly</option>
          </select>
          <div className="absolute top-[70%] right-4 transform -translate-y-1/2 pointer-events-none text-blue-600 text-2xl ">
            <img src={dropdownarrow} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormTwo;

