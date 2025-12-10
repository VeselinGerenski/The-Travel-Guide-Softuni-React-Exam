import { useEffect, useState } from "react";

export default function useValidation(validatorFn) {
    const [errors, setErrors] = useState({});

    const validate = (values) => {
        const newErrors = validatorFn(values);
        setErrors(newErrors);
        return newErrors;
    };

    useEffect(() => {
        if (errors.global) {
            const timer = setTimeout(() => {
                setErrors((prev) => ({ ...prev, global: null }));
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [errors.global]);

    return {
        errors,
        validate,
        setErrors,
    };
}