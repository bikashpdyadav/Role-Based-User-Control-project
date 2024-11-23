import React, { useState } from 'react';
import DOWN_ARROW from '../icons/Down_arrow.png';
import UP_ARROW from '../icons/Up_arrow.png';
import USER_ICON from '../icons/user.png';
import LOGOUT_ICON from '../icons/Logout.png';

const UserDetails = () => {
  const [isCardOpen, setisCardOpen] = useState(false);

  return (
    <div className="relative">
      {/* User Profile Section */}
      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={() => setisCardOpen(!isCardOpen)}>
        <img src={USER_ICON} alt="user" className="w-8 mx-4" />
        <span className="text-gray-800 font-medium">Admin</span>
        <img
          src={isCardOpen ? UP_ARROW : DOWN_ARROW}
          alt="toggle-dropdown"
          className="w-5 h-5 mx-2"
        />
      </div>

      {/* Dropdown Card */}
      {isCardOpen && (
        <ShowCardOptions
          onClose={() => setisCardOpen(false)} // Optionally close when clicked outside
        />
      )}
    </div>
  );
};

const ShowCardOptions = ({ onClose }) => {
  return (
    <div
      className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50">
      <ul className="text-left">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Profile</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Help</li>
        <li
          className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
          Logout
          <img src={LOGOUT_ICON} alt="logout" className="w-4 ml-2" />
        </li>
      </ul>
    </div>
  );
};

export default UserDetails;
