import { createContext, useContext } from "react";

const UserContext = createContext({
    isAuthenticated: false,

    user: {
       fullName: '',
        email: '',
        password: '',
        _createdOn: 0,
        _id: '',
        accessToken: '',
    },
    registerHandler() { },
    loginHandler() {},
    logoutHandler() { },
});

export function useUserContext() {
    const contextData = useContext(UserContext);

    return contextData;
}

export default UserContext;