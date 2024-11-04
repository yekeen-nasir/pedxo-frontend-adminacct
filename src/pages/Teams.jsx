import { nanoid } from "nanoid";
import SearchingDoc from "../components/SearchingDoc";

const Teams = () => {
  const onBoarding = [
    {
      id: nanoid(),
      title: "Create and send contract",
      desp: "You will create contract by filling information like personal details, role details, compensation and budget",
    },
    {
      id: nanoid(),
      title: "Our Team Review ",
      desp: "Pedxo will review and recommend a good fit according to your requirement via email.",
    },
    {
      id: nanoid(),
      title: "Notification",
      desp: "You will receive a notification, once your developer has signed the contract and will be automatically added to your team",
    },
  ];

  return (
    <div>
      <SearchingDoc
        heading="Teams"
        noticeText="How onboarding works?"
        searchingdocTitle="Create Contract"
        searchingdocText=" Start creating contract will refer you to your team members. Once
            they are added, you'll see them here"
        onBoarding={onBoarding}
      />
    </div>
  );
};
export default Teams;
