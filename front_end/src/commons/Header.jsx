import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div
      className="bg-blue-900 text-white py-5 text-left flex justify-start gap-48 px-10 fixed top-0 w-full "
      style={{ zIndex: "100" }}
    >
      <div>
        <div className="text-md font-bold">StiTech</div>
      </div>
      <div className=" flex gap-4 text-xs">
        <NavLink
          to="/view"
          className={({ isActive }) =>
            isActive ? "text-orange-300 font-semibold" : ""
          }
        >
          <div className="cursor-pointer hover:text-orange-200">View Users</div>
        </NavLink>
        <NavLink
          to="/create"
          className={({ isActive }) =>
            isActive ? "text-orange-300 font-semibold" : ""
          }
        >
          <div className="cursor-pointer hover:text-orange-200">
            Create Users
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
