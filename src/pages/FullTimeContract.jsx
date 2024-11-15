import { ContractForm } from "../components";


const FullTimeContract = () => {
  return (
    <div className="font-poppins ">
      <ContractForm
        subHead="Full-time Role"
        endDate="End Date (Optional)"
        showSwitch={true}
      />
    </div>
  );
};
export default FullTimeContract;
