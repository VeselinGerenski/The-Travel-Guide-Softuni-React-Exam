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

export function validateCity(values) {
    const errors = {};

    const regex = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
    // NAME
    const name = values.name?.trim() || "";
    if (!name) {
        errors.name = "City name is required";
    } else if (name.length < 3) {
        errors.name = "City name must be at least 3 characters";
    } else if (!regex.test(name)) {
        errors.name = "Use only letters, spaces and hyphens"
    }

    // COUNTRY
    const country = values.country?.trim() || "";
    if (!country) {
        errors.country = "Country is required";
    } else if (country.length < 3) {
        errors.country = "Country must be at least 3 characters";
    } else if (!regex.test(country)) {
        errors.country = "Use only letters, spaces and hyphens"
    }

    // POPULATION
    const populationRaw = values.population;
    if (populationRaw === "" || populationRaw === null || populationRaw === undefined) {
        errors.population = "Population is required";
    } else if (Number.isNaN(Number(populationRaw))) {
        errors.population = "Population must be a number";
    } else if (Number(populationRaw) <= 0) {
        errors.population = "Population must be a positive number";
    }

    // IMAGE URL
    const imageUrl = values.imageUrl?.trim() || "";
    if (!imageUrl) {
        errors.imageUrl = "Image URL is required";
    } if (!imageUrl.startsWith('/') && !imageUrl.startsWith('http')) {
        errors.imageUrl = "URL has to start with http or '/'";
    }

    // DESCRIPTION
    const description = values.description?.trim() || "";
    if (!description) {
        errors.description = "Description is required";
    } else if (description.length < 10) {
        errors.description = "Description must be at least 10 characters";
    }

    return errors;
}
