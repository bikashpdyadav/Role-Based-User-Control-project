import React from 'react';
import DASHBOARD_ICON from '../icons/dashboard.png';
import USER_ICON from '../icons/user.png';

function SideBar({ setActiveTab, showSidebar }) {
  return (
    <nav
      className={`flex flex-col items-center justify-center gap-4 transition-all duration-300 ${showSidebar ? 'fixed opacity-100 visible' : 'opacity-0 invisible'
        }`}
    >
      <img src={USER_ICON} alt='myprofile' className='w-14 m-4'></img>
      <button
        onClick={() => setActiveTab('dashboard')}
        className="px-4 py-2 flex flex-col items-center justify-center"
      >
        <img src={DASHBOARD_ICON} alt="dashboard_icon" className="w-6" />
        Dashboard
      </button>
      <button
        onClick={() => setActiveTab('users')}
        className="px-4 py-2 flex flex-col items-center justify-center"
      >
        <img src={USER_ICON} alt="users_icon" className="w-6" />
        Users
      </button>
      <button
        onClick={() => setActiveTab('roles')}
        className="px-4 py-2 flex flex-col items-center justify-center"
      >
        Roles
      </button>
      <button
        onClick={() => setActiveTab('permissions')}
        className="px-4 py-2 flex flex-col items-center justify-center"
      >
        Permissions
      </button>
    </nav>
  );
}

export default SideBar;
