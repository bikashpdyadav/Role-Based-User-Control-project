import React, { useState, useRef } from "react";
import { useAuth } from "./AuthProvider";
import { validateEmail, validatePassword } from "../utils/validate";
import Axios from 'axios';

const RoleManagement = () => {
  const { user } = useAuth();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const role = useRef('Viewer');
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Success message state

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.trim() === "") {
      setNameError("Name is required");
    } else if (value.length < 3) {
      setNameError("Name must be at least 3 characters long");
    } else {
      setNameError(null);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    validateEmail(value, setEmailError);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    validatePassword(value, setPasswordError);
  };

  const handleRoleChange = (e) => {
    const value = e.target.value;
    role.current.value = value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!nameError && !emailError && !passwordError) {
      try {
        const dataToSend = {
          name: name.current.value,
          email: email.current.value,
          password: password.current.value,
          role: role.current.value,
        };

        await Axios.post("http://localhost:3000/register", dataToSend, {
          headers: { 'Content-Type': 'application/json' }
        });

        // Clear the form fields
        name.current.value = "";
        email.current.value = "";
        password.current.value = "";
        role.current.value = "Viewer";

        // Show success message
        setSuccessMessage("User registered successfully!");
      } catch (error) {
        console.error("Error posting data:", error);
        setErrorMessage("An error occurred while registering the user.");
      }
    } else {
      setErrorMessage("Please fix the validation errors before proceeding.");
    }
  };

  const isAuthorized = user?.role === "Admin" || user?.role === "Super Admin";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">User Registration</h1>
      <hr className="mb-8 border-t-2 border-gray-400" />
      {!isAuthorized && (
        <div className="flex justify-center items-center">
          <p className="text-2xl font-semibold">Restricted Access</p>
        </div>
      )}
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg mx-auto mt-12">
        <h2 className={`text-3xl font-semibold text-center ${isAuthorized ? 'text-blue-600' : 'text-gray-400'} mb-6`}>
          Add User
        </h2>

        <form
          onSubmit={handleSubmit}
          className={`transition-all duration-300 ${isAuthorized ? '' : 'blur-sm pointer-events-none'}`}
        >
          <label className="font-bold text-lg">Full Name</label>
          <input
            ref={name}
            type="text"
            onChange={handleNameChange}
            className="mb-4 p-2 w-full bg-gray-500 bg-opacity-30 rounded-lg"
            required
          />
          {nameError && <p className="text-red-500 text-sm mb-2">{nameError}</p>}

          <label className="font-bold text-lg">Email Address</label>
          <input
            ref={email}
            type="email"
            onChange={handleEmailChange}
            className="mb-4 p-2 w-full bg-gray-500 bg-opacity-30 rounded-lg"
            required
          />
          {emailError && <p className="text-red-500 text-sm mb-2">{emailError}</p>}

          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              ref={role}
              onChange={handleRoleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md cursor-pointer"
            >
              <option value='Admin'>Admin</option>
              <option value='Manager'>Manager</option>
              <option value='Editor'>Editor</option>
              <option value='Viewer'>Viewer</option>
            </select>
          </div>

          <label className="font-bold text-lg">Password</label>
          <input
            ref={password}
            type="text"
            onChange={handlePasswordChange}
            className="mb-4 p-2 w-full bg-gray-500 bg-opacity-30 rounded-lg"
            required
          />
          {passwordError && <p className="text-red-500 text-sm mb-2">{passwordError}</p>}

          {errorMessage && <p className="my-4 font-bold text-lg text-red-500">{errorMessage}</p>}
          {successMessage && <p className="my-4 font-bold text-lg text-green-500">{successMessage}</p>}

          {isAuthorized && (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default RoleManagement;
