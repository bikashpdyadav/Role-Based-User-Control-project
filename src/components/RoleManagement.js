import React, { useState } from "react";
import { rolesMock } from "../mock/mockData";

const RoleManagement = () => {
  const [roles] = useState(rolesMock);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Role Management</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => (
          <div key={role.id} className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-bold">{role.name}</h3>
            <p>Permissions: {role.permissions.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleManagement;
