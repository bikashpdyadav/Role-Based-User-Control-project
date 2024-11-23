import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "./utils/validate";
import { addUser } from './utils/userSlice';
import { useDispatch } from "react-redux";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const dispatch = useDispatch();

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
      console.log("Sign-in successful.");
      dispatch(
        addUser({
            email: emailRef,
        })
      );
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
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl p-6">
            Sign In
          </h1>
        </div>
        <label className="font-bold text-lg">Email Address</label>
        <input
          ref={emailRef}
          type="email"
          onChange={handleEmailChange}
          className="mb-4 p-2 w-full bg-gray-500 bg-opacity-30 rounded-lg"
          required
        />
        {emailError && (
          <p className="text-red-500 text-sm mb-2">{emailError}</p>
        )}
        <label className="font-bold text-lg">Password</label>
        <input
          ref={passwordRef}
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
