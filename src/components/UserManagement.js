import React, { useState, useEffect } from "react";
import { usersMock } from "../mock/mockData";
import Axios from "axios";
import { useAuth } from "./AuthProvider";
import EditForm from "./EditForm";

const roleHierarchy = {
  "Super Admin": 5,
  Admin: 4,
  Manager: 3,
  Editor: 2,
  Viewer: 1,
};

const UserManagement = () => {
  const [users, setUsers] = useState(usersMock);
  const { user } = useAuth();
  const [showEditForm, setShowEditForm] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const handleOpenEditForm = (id) => {
    setEditUserId(id);
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setEditUserId(null);
    setShowEditForm(false);
  };

  const getData = async () => {
    const response = await Axios.get("http://localhost:3000/users");
    setUsers(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!user) return <></>;

  const userRoleRank = roleHierarchy[user.role];

  const canEdit = (targetUserRole) =>
    userRoleRank > roleHierarchy[targetUserRole]; // Can edit if user's role is higher than target user's role

  const canDelete = (targetUserRole) =>
    userRoleRank > roleHierarchy[targetUserRole]; // Can delete if user's role is higher than target user's role

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        console.log("User deleted successfully");
        // Refresh the users list
        getData();
      } else if (response.status === 404) {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
      } else {
        console.error("Unexpected error:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">User Management</h1>
      <hr className="mb-8 border-t-2 border-gray-400" />
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-center text-sm md:text-base">
                Name
              </th>
              <th className="px-4 py-2 text-center text-sm md:text-base">
                Email
              </th>
              <th className="px-4 py-2 text-center text-sm md:text-base">
                Role
              </th>
              <th className="px-4 py-2 text-center text-sm md:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-2 py-1 md:px-4 md:py-2 text-center text-sm md:text-base">
                  {user.name}
                </td>
                <td className="px-2 py-1 md:px-4 md:py-2 text-center text-sm md:text-base">
                  {user.email}
                </td>
                <td className="px-2 py-1 md:px-4 md:py-2 text-center text-sm md:text-base">
                  {user.role}
                </td>
                <td className="px-2 py-1 md:px-4 md:py-2 text-center">
                  <button
                    onClick={() => deleteUser(user.id)}
                    disabled={!canDelete(user.role)} // Disable if not allowed to delete
                    className={`mr-2 px-2 py-1 md:px-3 md:py-1 rounded text-xs md:text-sm ${
                      canDelete(user.role)
                        ? "bg-red-500 hover:bg-red-400 text-white"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleOpenEditForm(user.id)} // Pass the user ID to the function
                    disabled={!canEdit(user.role)} // Disable if not allowed to edit
                    className={`ml-2 px-2 py-1 md:px-3 md:py-1 rounded text-xs md:text-sm ${
                      canEdit(user.role)
                        ? "bg-gray-400 hover:bg-gray-300 text-white"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEditForm && (
        <EditForm userId={editUserId} onClose={handleCloseEditForm} refreshData={getData} />
      )}
    </div>
  );
};

export default UserManagement;
