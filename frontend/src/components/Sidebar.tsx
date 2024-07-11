import React from "react";
import { RiGroupLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { MdQrCodeScanner } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { DiMagento } from "react-icons/di";
import useAuth from "../hooks/useAuth";

export interface SidebarProps {
  selected?: "list" | "feedbackByPlace" | "";
}

const Sidebar: React.FC<SidebarProps> = ({ selected }) => {
  const nav = useNavigate();
  const { logout } = useAuth();

  const handleClick = (route: string) => {
    nav(route, { replace: true });
  };

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <div className="w-20 h-screen bg-white shadow-2xl justify-between flex flex-col  items-center py-8">
      <div className="flex flex-col gap-4 items-center">
        <DiMagento className="w-12 h-12 text-primary" />
        <div className="w-1/2 border-2 border-gray-100 my-2 rounded-full"></div>
        <div
          onClick={selected == "list" ? undefined : () => handleClick("/list")}
          className={`rounded-xl drop-shadow-lg border-gray-100 border-2 hover:scale-110 min-w-12 min-h-12 flex 
          justify-center items-center transition-all hover:cursor-pointer ${selected == "list" ? "bg-primary" : "bg-white"}`}
        >
          <RiGroupLine
            className={` w-6 h-6 ${selected == "list" ? "fill-white" : "fill-primary"}`}
          />
        </div>
        <div
          onClick={
            selected == "feedbackByPlace"
              ? undefined
              : () => handleClick("/feedbackByPlace")
          }
          className={`rounded-xl drop-shadow-lg border-gray-100 border-2 hover:scale-110 min-w-12 min-h-12 flex 
          justify-center items-center transition-all hover:cursor-pointer ${selected == "feedbackByPlace" ? "bg-primary" : "bg-white"}`}
        >
          <MdQrCodeScanner
            className={` w-6 h-6 ${selected == "feedbackByPlace" ? "text-white" : "text-primary"}`}
          />
        </div>
      </div>
      <MdLogout
        onClick={handleLogout}
        className="w-8 h-8 fill-primary hover:opacity-40 hover:cursor-pointer"
      />
    </div>
  );
};

export default Sidebar;
