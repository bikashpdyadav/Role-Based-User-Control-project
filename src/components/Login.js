// import { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { validateEmail, validatePassword } from "./utils/validate";
// import { addUser } from './utils/userSlice';
// import { useDispatch } from "react-redux";
// import Axios from 'axios';
// import { useAuth } from './AuthProvider';

// const Login = () => {
//   const [errorMessage, setErrorMessage] = useState(null);
//   const navigate = useNavigate();
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);
//   const [emailError, setEmailError] = useState(null);
//   const [passwordError, setPasswordError] = useState(null);
//   const [responseData, setResponseData] = useState(null);
//   const dispatch = useDispatch();
//   const { login } = useAuth();

//   const handleEmailChange = (e) => {
//     const value = e.target.value;
//     validateEmail(value, setEmailError);
//   };

//   const handlePasswordChange = (e) => {
//     const value = e.target.value;
//     validatePassword(value, setPasswordError);
//   };

//   const handleSignin = async (e) => {
//     e.preventDefault();
//     if (!emailError && !passwordError) {
//       try {
//         const dataToSend = {
//           email: emailRef.current.value,
//           password: passwordRef.current.value,
//         };

//         const response = await Axios.post("http://localhost:3000/login", dataToSend,
//           {
//             headers: { 'Content-Type': 'application/json' }
//           });

//         // Assuming the API responds with some data
//         setResponseData(response.data);
//         console.log("Response Data:", response.data);
//         if (response.data && response.data.user) {
//           dispatch(
//             addUser({
//               email: emailRef.current.value,
//             })
//           );
//         }
//       } catch (error) {
//         console.error("Error posting data:", error);
//       }
//     } else {
//       setErrorMessage("Please fix the validation errors.");
//     }
//   };

//   return (
//     <div>
//       <form
//         onSubmit={handleSignin}
//         className="absolute p-8 mx-auto left-0 right-0 top-1/2 transform -translate-y-1/2 rounded-lg text-black flex flex-col w-11/12 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4"
//       >
//         <div className="flex items-center justify-center">
//           <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl p-6">
//             Sign In
//           </h1>
//         </div>
//         <label className="font-bold text-lg">Email Address</label>
//         <input
//           ref={emailRef}
//           type="email"
//           onChange={handleEmailChange}
//           className="mb-4 p-2 w-full bg-gray-500 bg-opacity-30 rounded-lg"
//           required
//         />
//         {emailError && (
//           <p className="text-red-500 text-sm mb-2">{emailError}</p>
//         )}
//         <label className="font-bold text-lg">Password</label>
//         <input
//           ref={passwordRef}
//           type="password"
//           onChange={handlePasswordChange}
//           className="mb-4 p-2 w-full bg-gray-500 bg-opacity-30 rounded-lg"
//           required
//         />
//         {passwordError && (
//           <p className="text-red-500 text-sm mb-2">{passwordError}</p>
//         )}
//         {errorMessage && (
//           <p className="my-4 font-bold text-lg text-red-500">{errorMessage}</p>
//         )}
//         <button
//           type="submit"
//           className="my-4 p-2 w-full bg-[#e2b808] rounded-lg font-semibold hover:bg-[#d1a507] transition-colors"
//         >
//           Sign in now
//         </button>
//         <p
//           className="my-4 cursor-pointer font-bold text-lg text-center"
//           onClick={() => navigate("/signup")}
//         >
//           Not Registered? Sign Up Now
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validate";
import { useAuth } from "./AuthProvider";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    validateEmail(value, setEmailError);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    validatePassword(value, setPasswordError);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    if (!emailError && !passwordError) {
      try {
        await login(emailRef.current.value, passwordRef.current.value);
        // Navigate to a protected route or dashboard
        navigate("/home");
      } catch (error) {
        console.error("Login failed:", error);
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } else {
      setErrorMessage("Please fix the validation errors.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSignin}
        className="absolute p-8 mx-auto left-0 right-0 top-1/2 transform -translate-y-1/2 rounded-lg text-black flex flex-col w-11/12 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4"
      >
        <div className="flex items-center justify-center">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl p-6">Sign In</h1>
        </div>
        <label className="font-bold text-lg">Email Address</label>
        <input
          ref={emailRef}
          type="email"
          onChange={handleEmailChange}
          className="mb-4 p-2 w-full bg-gray-500 bg-opacity-30 rounded-lg"
          required
        />
        {emailError && <p className="text-red-500 text-sm mb-2">{emailError}</p>}
        <label className="font-bold text-lg">Password</label>
        <div className="relative">
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            onChange={handlePasswordChange}
            className="mb-4 p-2 w-full bg-gray-500 bg-opacity-30 rounded-lg"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-[10%] text-black"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {passwordError && <p className="text-red-500 text-sm mb-2">{passwordError}</p>}
        {errorMessage && <p className="my-4 font-bold text-lg text-red-500">{errorMessage}</p>}
        <button
          type="submit"
          className="my-4 p-2 w-full bg-[#e2b808] rounded-lg font-semibold hover:bg-[#d1a507] transition-colors"
        >
          Sign in now
        </button>
        <p
          className="my-4 cursor-pointer font-bold text-lg text-center"
          onClick={() => navigate("/signup")}
        >
          Not Registered? Sign Up Now
        </p>
      </form>
    </div>
  );
};

export default Login;
