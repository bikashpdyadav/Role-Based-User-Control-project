import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthProvider";

const MyProfile = ({ setshowMyProfile }) => {
    const { user } = useAuth();
    const [profile, setProfile] = useState({});
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        role: "",
        status: "",
    });

    // Fetch user profile details
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${user.id}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:3000/users/${user.id}`, userData);
            setProfile((prev) => ({ ...prev, name: editName, email: editEmail }));
            setSuccess("Name updated successfully!");
            setError("");
        } catch (error) {
            console.error("Error updating name:", error);
            setError("Failed to update name.");
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">

            <div className="bg-white p-6 shadow-md rounded-md">
                <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Profile Details</h2>
                <button
                    onClick={() => setshowMyProfile(false)}
                    className="text-xl px-2 font-bold text-red-500 hover:bg-gray-300 hover:rounded-full"
                >
                    &times;
                </button>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100">
                        {profile.role}
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400"
                >
                    Update
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {success && <p className="text-green-500 mt-4">{success}</p>}
            </div>
        </div>
    );
};

export default MyProfile;
