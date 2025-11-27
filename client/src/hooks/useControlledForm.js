import { useState } from "react"

export default function useControlledForm(initialValues, onSubmit) {
    const [values, setValues] = useState(initialValues)

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        await onSubmit(values)

        setValues(initialValues)
    }
    // return { values, changeHandler, submitHandler }
    return {
        values,
        changeHandler,
        submitHandler,
    }
}