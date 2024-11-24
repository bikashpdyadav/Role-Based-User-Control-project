import React from 'react';
import { FaHome, FaFilm, FaTv, FaUser } from "react-icons/fa";

const MenuBar = ({ setActiveTab }) => {
  return (
    <div className="text-white p-2 z-50 bg-gray-900 fixed bottom-0 w-screen flex justify-around lg:justify-evenly items-center border-t border-gray-700">
      <div
        className="menu-item flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110"
        onClick={() => setActiveTab('dashboard')}
      >
        <FaHome className="text-lg sm:text-xl" />
        <span className="text-xs sm:text-sm mt-1">Dashboard</span>
      </div>
      <div
        className="menu-item flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110"
        onClick={() => setActiveTab('users')}
      >
        <FaUser className="text-lg sm:text-xl" />
        <span className="text-xs sm:text-sm mt-1">Users</span>
      </div>
      <div
        className="menu-item flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110"
        onClick={() => setActiveTab('roles')}
      >
        <FaFilm className="text-lg sm:text-xl" />
        <span className="text-xs sm:text-sm mt-1">Add Users</span>
      </div>
    </div>
  );
};

export default MenuBar;
