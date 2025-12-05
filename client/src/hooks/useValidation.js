import { useState } from "react";

export default function useValidation(validatorFn) {
    const [errors, setErrors] = useState({});

    const validate = (values, apiError = null) => {
        // 1️⃣ Run client-side validator
        const newErrors = { ...validatorFn(values) };

        // 2️⃣ Handle backend errors (API)
        if (apiError) {
            const msg = apiError?.message?.toLowerCase() || "";

            if (msg.includes("409") || msg.includes("exists") || msg.includes("conflict")) {
                newErrors.email = "This email is already registered.";
            }

            if (
                msg.includes("invalid credentials") ||
                msg.includes("403") ||
                msg.includes("login or password don't match") // ✅ SoftUni text
            ) {
                newErrors.password = "Incorrect email or password.";
            }
        }
        setErrors(newErrors);
        return newErrors;
    };

    return {
        errors,
        validate,
        setErrors, // useful for manually resetting errors
    };
}
