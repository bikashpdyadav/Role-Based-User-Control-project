// Email Validation
export const validateEmail = (value, setEmailError) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
        setEmailError("Email is required.");
    } else if (!emailRegex.test(value)) {
        setEmailError("Enter a valid email address.");
    } else {
        setEmailError(null);
    }
};

// Password Validation
export const validatePassword = (value, setPasswordError) => {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!value) {
        setPasswordError("Password is required.");
    } else if (!passwordRegex.test(value)) {
        setPasswordError(
            "Password must have at least 6 characters, including one uppercase, one lowercase, one number, and one special character."
        );
    } else {
        setPasswordError(null);
    }
};