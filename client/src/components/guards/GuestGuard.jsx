import { useUserContext } from "../../contexts/UserContext.js";
import { Navigate, Outlet } from "react-router";

export default function GuestGuard() {
    const { isAuthenticated } = useUserContext();

    return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};