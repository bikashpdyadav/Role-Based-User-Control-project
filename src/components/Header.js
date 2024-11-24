import React from "react";
import MENU_ICON from '../icons/Menu.png';
import UserDetails from "./UserDetails";

const Header = ({ toggleSidebar, showSidebar }) => {
  return (
    <div className={`fixed p-4 bg-white transition-all duration-300 ${showSidebar ? `w-[90%]`:`w-full`}`}>
      <header
      className='flex justify-end lg:justify-between items-center'
    >
      <img 
        src={MENU_ICON} 
        alt="menuicon" 
        onClick={toggleSidebar} 
        className="cursor-pointer left-0 hidden lg:block" 
      />
      <UserDetails />
    </header>
    </div>
  );
};

export default Header;
