import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthProvider";

const EditForm = ({ userId, onClose, refreshData }) => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        role: "",
        status: "",
    });
    const [initialData, setInitialData] = useState({});
    const [isModified, setIsModified] = useState(false);
    const { user } = useAuth();

    // Define role hierarchy
    const roleHierarchy = ["Super Admin", "Admin", "Manager", "Editor", "Viewer"];

    // Restrict role options based on current user's role
    const availableRoles = roleHierarchy.slice(
        roleHierarchy.indexOf(user.role) + 1
    );

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${userId}`);
                setUserData(response.data);
                setInitialData(response.data); // Store initial data to compare for modification
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => {
            const updatedData = { ...prevData, [name]: value };
            setIsModified(JSON.stringify(updatedData) !== JSON.stringify(initialData));
            return updatedData;
        });
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/users/${userId}`, userData);
            alert("User updated successfully!");
            refreshData();
            onClose(); // Close the form after saving
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user.");
        }
    };

    const handleDiscard = () => {
        setUserData(initialData); // Reset to initial data
        onClose(); // Close the form
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Edit User</h3>
                    <button
                        onClick={onClose}
                        className="text-xl px-2 font-bold text-red-500 hover:bg-gray-300 hover:rounded-full"
                    >
                        &times;
                    </button>
                </div>

                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={userData.role}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md cursor-pointer"
                        >
                            {availableRoles.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <input
                            type="text"
                            id="status"
                            name="status"
                            value={userData.status}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={handleDiscard}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                        >
                            Discard
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={!isModified}
                            className={`px-4 py-2 rounded-md ${isModified ? 'bg-blue-500 text-white' : 'bg-gray-500 text-gray-300'}`}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditForm;
