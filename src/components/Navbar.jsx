import overview from "../assets/svg/overview.svg";
import adddeveloper from "../assets/svg/adddeveloper.svg";
import createcontract from "../assets/svg/createcontract.svg";
import teams from "../assets/svg/teams.svg";
import payroll from "../assets/svg/payroll.svg";
import expenses from "../assets/svg/expenses.svg";
import agreements from "../assets/svg/agreements.svg";
import logout from "../assets/svg/logout.svg";
import dropdown from "../assets/svg/dropdown.svg";
import { useEffect, useRef, useState } from "react";
import SideBarMenuItems from "../components/SideBarMenuItems";

const Navbar = () => {
  const [toggleLogout, setToggleLogout] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const navRef = useRef(null);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleClickOutside = (e) => {
    if (navRef.current && !navRef.current.contains(e.target)) {
      setToggleMenu(false);
    }
  };

  useEffect(() => {
    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      endX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const swipeDistance = startX - endX;
      if (swipeDistance > 30) {
        // If swipe left by more than 30px, close the navbar
        setToggleMenu(false);
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav>
      <div
        className="absolute top-[64px] left-5 md:hidden"
        onClick={handleToggleMenu}
      >
        <img src={dropdown} alt="menu icon" />
      </div>
      <div
        ref={navRef}
        className={`absolute z-10 h-[844px] flex flex-col justify-between sec-bg-clr max-w-[228px] transform transition-transform duration-300 ease-in-out ${
          toggleMenu ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:h-[1024px]`}
      >
        <div className="pt-[44px] pl-[40px] lg:pt-[73px]">
          <h1 onClick={handleToggleMenu} className=" text-[35px] font-extrabold leading-normal mb-[50px]">
            Pedxo
          </h1>
          <div className="flex flex-col gap-[30px] capitalize">
            <SideBarMenuItems
              to="/dashboard/overview"
              icon={overview}
              title="Overview"
            />

            <div className="flex flex-col gap-8 ">
              <div className="grey-text text-sm font-semibold leading-normal">
                Hiring
              </div>
              <SideBarMenuItems
                to="/dashboard/add-developer"
                icon={adddeveloper}
                title="add developer"
              />
              <SideBarMenuItems
                to="/dashboard/create-contract"
                icon={createcontract}
                title="create contract"
              />
              <SideBarMenuItems
                to="/dashboard/teams"
                icon={teams}
                title="teams"
              />
            </div>

            <div className="flex flex-col gap-6">
              <div className="grey-text text-sm font-semibold leading-normal">
                Payment
              </div>
              <SideBarMenuItems
                to="/dashboard/payroll"
                icon={payroll}
                title=" payroll"
              />
              <SideBarMenuItems
                to="/dashboard/expenses"
                icon={expenses}
                title="expenses "
              />
            </div>

            <div className="flex flex-col gap-6">
              <div className="grey-text text-sm font-semibold leading-normal">
                Activity
              </div>
              <SideBarMenuItems
                to="/dashboard/agreements"
                icon={agreements}
                title="agreements "
              />
            </div>
          </div>
        </div>

        <div
          onClick={() => setToggleLogout(!toggleLogout)}
          className="user-bg-clr px-[22px] py-[20px]"
        >
          <div className="flex items-center gap-2">
            <div className="w-[44px] h-[44px] rounded-full user-avatar text-white font-semibold flex items-center justify-center">
              D
            </div>
            <div>
              <div className="font-semibold leading-normal">Personal</div>
              <div className="text-[12px] user-email-clr">
                davidpat@gmail.com
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            {toggleLogout && (
              <button className="py-[6px] px-[36px] font-medium text-[13px] pr-bg-clr text-white mt-[15px] rounded-lg flex items-center justify-center gap-[10px]">
                <img src={logout} alt="logout icon" />
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
