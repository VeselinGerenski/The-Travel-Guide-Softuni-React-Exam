import { useState } from "react";
import useRequest from "../hooks/useRequest.js";
import UserContext from "./UserContext.js";

export default function UserProvider({
    children,
}) {
    const [user, setUser] = useState(null);
    const { request } = useRequest();

    const registerHandler = async (email, password) => {
        const newUser = { email, password };

        // Register API call
        const result = await request('/users/register', 'POST', newUser)

        // Log user after registration
        setUser(result);
    }

    const loginHandler = async (email, password) => {
        const result = await request('/users/login', 'POST', { email, password })

        console.log(result);

        setUser(result);
    }

    const logoutHandler = async () => {
        if (!user) {
            return;
        }
        try {
            await request('/users/logout', 'POST', null, { accessToken: user.accessToken });
        } catch (err) {
            alert(err);
        } finally {
            setUser(null);
        }
    };

    const userContextValues = {
        user,
        isAuthenticated: !!user?.accessToken,
        registerHandler,
        loginHandler,
        logoutHandler,
    }

    return (
        <UserContext.Provider value={userContextValues}>
            {children}
        </UserContext.Provider>
    )
}