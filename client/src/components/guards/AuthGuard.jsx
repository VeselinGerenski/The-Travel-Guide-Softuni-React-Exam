import { useContext } from "react";
import UserContext from "../../contexts/UserContext.js";
import { Navigate, Outlet } from "react-router";


export default function AuthGuard() {

    const { isAuthenticated } = useContext(UserContext);

    if (!isAuthenticated) {
       return <Navigate to="/login" replace />;
    }

     return <Outlet />;
}