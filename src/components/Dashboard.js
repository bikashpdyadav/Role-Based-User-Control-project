import React from 'react';
import USER_CONFIG from '../icons/user_config.png';
import KEY_ICON from '../icons/key-solid.svg';
import USERS_ICON from '../icons/UserGroupOutline.png';
import SECURITY from '../icons/Security.png';
import EDIT from '../icons/edit.png';
import VIEW from '../icons/eye-regular.svg';
import SETTING from '../icons/setting.png';
import PLUS from '../icons/circle-plus-solid.svg';
import LOCK from '../icons/lock-solid.svg';

const Dashboard = () => {
  const cards = [
    {
      role: 'Admin',
      permissions: [
        {
          value: 'Full System Access',
          image: SECURITY,
        },
        {
          value: 'User Management',
          image: USER_CONFIG,
        },
        {
          value: 'System Configuration',
          image: SETTING,
        }
      ],
      users: 3,
      bg: 'bg-red-500',
    },
    {
      role: 'Manager',
      permissions: [
        {
          value: 'Edit Responses',
          image: EDIT,
        },
        {
          value: 'View Team Data',
          image: VIEW,
        },
        {
          value: 'Limited Configuration',
          image: SETTING,
        }
      ],
      users: 12,
      bg: 'bg-blue-500',
    },
    {
      role: 'Editor',
      permissions: [
        {
          value: 'Create Content',
          image: PLUS,
        },
        {
          value: 'Edit Content',
          image: EDIT,
        },
        {
          value: 'Publish Drafts',
          image: LOCK,
        },
      ],
      users: 25,
      bg: 'bg-green-500',
    },
    {
      role: 'Viewer',
      permissions: [
        {
          value: 'Read-only Access',
          image: VIEW,
        },
        {
          value: 'Limited Dashboard View',
          image: SECURITY,
        },
      ],
      users: 50,
      bg: 'bg-gray-500',
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
      <hr className="mb-8 border-t-2 border-gray-400" />

      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bg} text-white shadow-lg rounded-lg p-8 border w-full sm:w-3/4 md:w-3/5 mx-auto mb-4`}>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold mb-2">{card.role}</h2>
            <img src={USER_CONFIG} alt="userconfig" className="w-8 sm:w-10 md:w-12" />
          </div>
          <div className="flex items-center gap-4 my-4">
            <img src={KEY_ICON} alt="key" className="w-6 sm:w-8" />
            <p className="text-xl font-semibold">Permissions</p>
          </div>
          <div className='my-4'>
            {card.permissions.map((permission, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <img src={permission.image} alt={permission.value} className="w-5 sm:w-6" />
                <p>{permission.value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <img src={USERS_ICON} alt="users" className="w-8 sm:w-10" />
            <span className="text-xl font-bold">{card.users} Users Assigned</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
