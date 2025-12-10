
import { Navigate, Outlet } from "react-router";
import { useUserContext } from "../../../contexts/UserContext.js";

export default function GuestGuard() {
    const { isAuthenticated } = useUserContext();
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};