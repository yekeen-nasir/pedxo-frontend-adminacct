import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const SideBarMenuItems = ({ icon, title, to }) => {
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
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <NavLink
      to={to}
      onClick={handleToggleMenu}
      className="flex items-center gap-3"
    >
      <img src={icon} alt="overview" />
      <div className="font-semibold leading-normal hover:pr-text-clr active:pr-text-clr">{title}</div>
    </NavLink>
  );
};
export default SideBarMenuItems;

// To change the color of an SVG icon when the NavLink is clicked (active), you can manipulate the SVG directly by changing its fill or stroke attribute based on the active state. In React Router, the NavLink component provides an isActive prop to determine if the link is currently active.

// Here's an example of how you can use isActive to change the color of the SVG:
// <NavLink
//   to={to}
//   onClick={handleToggleMenu}
//   className={({ isActive }) =>
//     `flex items-center gap-3 group ${isActive ? "active" : ""}`
//   }
// >
//   <img
//     src={icon}
//     alt="overview"
//     className="group-hover:pr-text-clr"
//     style={{ fill: isActive ? "var(--your-active-color)" : "currentColor" }}
//   />
//   <div
//     className={`font-semibold leading-normal ${
//       isActive ? "active-text" : ""
//     }`}
//   >
//     {title}
//   </div>
// </NavLink>
