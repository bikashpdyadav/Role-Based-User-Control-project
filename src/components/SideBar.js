import React from 'react';
import DASHBOARD_ICON from '../icons/dashboard.png';
import USER_ICON from '../icons/user.png';
import { useAuth } from './AuthProvider';

function SideBar({ setActiveTab, showSidebar }) {
  const { user } = useAuth();
  if (!user) return <></>;

  const [firstName, lastName] = user.name.split(' ');

  return (
    <nav
      className={`flex flex-col items-center justify-center gap-4 transition-all duration-300 ${showSidebar ? 'fixed opacity-100 visible' : 'opacity-0 invisible'}`}
    >
      <div className='flex flex-col items-center justify-center mt-4'>
        <img src={USER_ICON} alt='myprofile' className='w-14' />
        <p className='text-xl font-semibold'>{firstName}</p>
        <p className='text-xl font-semibold'>{lastName}</p>
        <p className='text-lg font-semibold'>({user.role})</p>
      </div>
      <hr className="w-11/12 border-t-2 border-gray-400"></hr>
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
        Add Users
      </button>
    </nav>
  );
}

export default SideBar;
