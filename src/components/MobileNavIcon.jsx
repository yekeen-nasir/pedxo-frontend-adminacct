import dropdown from "../assets/svg/dropdown.svg";
const MobileNavIcon = ({toggleMobileNav}) => {
  return (
    <div
      className="absolute top-[62px] left-5 md:hidden"
      onClick={toggleMobileNav}
    >
      <img src={dropdown} alt="menu icon" />
    </div>
  );
};
export default MobileNavIcon;
