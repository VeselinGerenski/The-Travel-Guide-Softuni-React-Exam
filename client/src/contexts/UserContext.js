import { createContext } from "react";

const UserContext = createContext({
    user: {},
    isAuthenticated: false,
    onLogin() {},
    onLogout() {},
    onDelete() {},
});

export default UserContext;