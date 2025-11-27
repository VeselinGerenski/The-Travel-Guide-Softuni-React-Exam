import { createContext } from "react";

const UserContext = createContext({
    user: {},
    isAuthenticated: false,
    onLogin() {},
    onLogout() {},
});

export default UserContext;