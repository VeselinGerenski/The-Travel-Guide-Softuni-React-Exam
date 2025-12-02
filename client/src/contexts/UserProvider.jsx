
import useRequest from "../hooks/useRequest.js";
import useLocalStorage from "../hooks/useLocalStorage.js";
import UserContext from "./UserContext.js";

export default function UserProvider({ children }) {
    const [user, setUser] = useLocalStorage(null, 'user');
    const { request } = useRequest(user);

    const registerHandler = async (email, password) => {
        const newUser = { email, password };
        const result = await request('/users/register', 'POST', newUser);
        setUser(result);
    };

    const loginHandler = async (email, password) => {
        const result = await request('/users/login', 'POST', { email, password });
        setUser(result);
    };

    const logoutHandler = async () => {
        if (!user) return;
        try {
            await request('/users/logout', 'POST', null, { accessToken: user.accessToken });
        } catch (err) {
            alert(err.message);
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
    };

    return (
        <UserContext.Provider value={userContextValues}>
            {children}
        </UserContext.Provider>
    );
}
