import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const SideBarMenuItems = ({ icon: Icon, title, onClick, to }) => {
  const [color, setColor] = useState("black")
  return (
    <>
      <NavLink
        to={to}
        onMouseEnter={() =>setColor("#4195f1")}
        onMouseLeave={() => setColor("black")}
        onClick={onClick}
        className={({ isActive }) =>
          `flex items-center text-sm gap-2 transition-colors duration-200 font-normal leading-normal hover:pr-text-clr ${
            isActive
              ? "bg-primary text-primary-foreground pr-text-clr"
              : "text-gray-700 hover:bg-primary/10 hover:text-primary"
          }`
        }
      >
        {/*
        ##########################################
        Better way to reduce redundancy below */}
        {/* {({ isActive }) => (
          <>
            {!newel ? (
              <img
                src={icon}
                alt={`${title} icon`}
                className={`w-5 h-5 hover:pr-text-clr navbar-svg-clr  ${
                  isActive ? "filter-primary-color" : "black"
                } transition-all duration-500`}
              />
            ) : (
              <Icon color="blue" />
            )}
            <div
              className={`font-semibold leading-normal hover:pr-text-clr ${
                isActive ? "pr-text-clr" : "black"
              } transition-colors duration-500`}
            >
              {title}
            </div>
          </>
        )} 
         ############################################
         */}
        {({ isActive }) => (
          <>
            {Icon && <Icon color={isActive ? "#4195f1" : color} />}
            {title}
          </>
        )}
      </NavLink>
    </>
  );
};
export default SideBarMenuItems;
