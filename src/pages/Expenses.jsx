import { nanoid } from "nanoid";
import SearchingDoc from "../components/SearchingDoc";

const Expenses = () => {
  const onBoarding = [
    {
      id: nanoid(),
      title: "Manage expense requests",
      desp: "Any payment history for your team will appear and be stored here for future reference",
    },
    {
      id: nanoid(),
      title: "Review expenses requests",
      desp: "Review pending and successful expense requests for your team. Ensure all pending requests are addressed and processed immediately",
    },
  ];

  return (
    <div>
      <SearchingDoc
        heading="Expenses"
        subHead="August/2024"
        noticeText="Add devs and pay them to see their records here."
        searchingdocTitle="No Payroll Yet"
        searchingdocText="They would be generated when you start
 making payment"
        onBoarding={onBoarding}
      />
    </div>
  );
};
export default Expenses;
