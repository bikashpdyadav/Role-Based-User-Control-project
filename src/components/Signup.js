import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "./utils/validate";

const Signup = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const [nameError, setNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

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

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!nameError && !emailError && !passwordError) {
            console.log("Sign-up successful.");
        } else {
            setErrorMessage("Please fix the validation errors before proceeding.");
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSignup}
                className="absolute p-8 mx-auto left-0 right-0 top-1/2 transform -translate-y-1/2 rounded-lg text-black flex flex-col w-11/12 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4"
            >
                <div className="flex items-center justify-center">
                    <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl p-6">
                        Sign Up
                    </h1>
                </div>
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
                <label className="font-bold text-lg">Password</label>
                <input
                    ref={password}
                    type="password"
                    onChange={handlePasswordChange}
                    className="mb-4 p-2 w-full bg-gray-500 bg-opacity-30 rounded-lg"
                    required
                />
                {passwordError && (
                    <p className="text-red-500 text-sm mb-2">{passwordError}</p>
                )}
                {errorMessage && (
                    <p className="my-4 font-bold text-lg text-red-500">{errorMessage}</p>
                )}
                <button
                    type="submit"
                    className="my-4 p-2 w-full bg-[#e2b808] rounded-lg font-semibold hover:bg-[#d1a507] transition-colors"
                >
                    Sign up now
                </button>
                <p
                    className="my-4 cursor-pointer font-bold text-base text-center"
                    onClick={() => navigate("/login")}
                >
                    Already Registered? Sign In Now
                </p>
            </form>
        </div>
    );
};

export default Signup;
