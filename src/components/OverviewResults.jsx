

const OverviewResults = ({ title, subTitle, icon, amount }) => {
  return (
    <div>
      <h2 className="font-semibold leading-normal md:text-[27px]">{title}</h2>
      <p className="text-sm font-medium leading-normal grey-text pr-[51px] md:text-[16px]">
        {subTitle}
      </p>

      <div className="flex items-center gap-4 bg-white rounded-lg py-3 px-[21px] md:py-10 md:px-16">
        <img src={icon} alt={title} />
        <span className="text-2xl font-semibold leading-normal">{amount}</span>
      </div>
    </div>
  );
};
export default OverviewResults;


