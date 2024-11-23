import React from "react";
import { permissionsMock } from "../mock/mockData";

const PermissionManagement = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Permission Management</h2>
      <ul className="list-disc ml-5">
        {permissionsMock.map((permission, index) => (
          <li key={index} className="mb-1">
            {permission}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PermissionManagement;
