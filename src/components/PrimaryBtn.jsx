const PrimaryBtn = ({ text }) => {
  return (
    <div className="flex items-center justify-center gap-[10px] rounded-lg py-[1em] px-[2em] xl:py-[15px] xl:px-[31px] font-semibold text-[0.625rem] xl:text-base pr-bg-clr text-white ">
      <button className="flex items-center gap-[10px]">{text}</button>
    </div>
  );
};
export default PrimaryBtn;
