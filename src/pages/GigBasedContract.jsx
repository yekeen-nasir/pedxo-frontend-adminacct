import { ContractForm } from "../components";

const GigBasedContract = () => {
  return (
    <div className="font-poppins ">
      <ContractForm
        subHead="Gig-Based Role"
        endDate="End Date *"
        showSwitch={false}
      />
    </div>
  );
};
export default GigBasedContract;
