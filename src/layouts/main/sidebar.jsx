import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[280px] shrink-0 bg-[#1C2536] h-[100vh] relative">
      <Link to={"/"}>
        <div className="w-[100%] h-[100px] dropped1 flex items-center px-[30px] drop-shadow-xl  relative">
          <img src="/bgLogo.svg" alt="" />
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
