import { nanoid } from "nanoid";
import SearchingDoc from "../components/SearchingDoc";

const Payroll = () => {
  const onBoarding = [
    {
      id: nanoid(),
      title: "View all due and paid team.",
      desp: "Review draft contractor payments that have been automatically generated. Ensure all details are accurate",
    },
    {
      id: nanoid(),
      title: "Simple one-click payment",
      desp: "Choose to pay all your due team members at once or select them individually",
    },
    {
      id: nanoid(),
      title: "Automated payment process",
      desp: "Once you've successfully paid your team, an invoice will be generated for your records. After the funds are received, your contractors will be paid seamlessly",
    },
  ];

  return (
    <div>
      <SearchingDoc
        heading="Payroll"
        noticeText="How onboarding works?"
        searchingdocTitle="No Payroll Yet"
        searchingdocText="They would be generated when you start
 making payment" 
        onBoarding={onBoarding}
      />
    </div>
  );
};
export default Payroll;
