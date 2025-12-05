// Full name: only letters, spaces and hyphens
const FULL_NAME_REGEX = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

// Email pattern
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegister(values) {
    const errors = {};

    // FULL NAME
    const fullName = values.fullName?.trim() || "";
    if (!fullName) {
        errors.fullName = "Full name is required";
    } else if (fullName.length < 5) {
        errors.fullName = "Full name must be at least 5 characters";
    } else if (!FULL_NAME_REGEX.test(fullName)) {
        errors.fullName = "Use only letters, spaces and hyphens";
    }

    // EMAIL
    const email = values.email?.trim() || "";
    if (!email) {
        errors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email)) {
        errors.email = "Please enter a valid email address";
    }

    // PASSWORD
    const password = values.password || "";
    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 5) {
        errors.password = "Password must be at least 5 characters";
    } else {
        if (!/[A-Za-z]/.test(password)) {
            errors.password = "Password must include a letter";
        } else if (!/\d/.test(password)) {
            errors.password = "Password must include a number";
        }
    }

    // REPEAT PASSWORD
    const repeatPassword = values.repeatPassword || "";
    if (!repeatPassword) {
        errors.repeatPassword = "Please repeat your password";
    } else if (repeatPassword !== password) {
        errors.repeatPassword = "Passwords do not match";
    }

    return errors;
}

export function validateLogin(values) {
    const errors = {};
    // EMAIL
    const email = values.email?.trim() || "";
    if (!email) {
        errors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email)) {
        errors.email = "Please enter a valid email address";
    }

    // PASSWORD
    const password = values.password || "";
    if (!password) {
        errors.password = "Password is required";
    }

    return errors;
}

