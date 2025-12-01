import { useUserContext } from "../../contexts/UserContext.js";
import { Navigate, Outlet } from "react-router";

export default function AuthGuard() {
   const { isAuthenticated } = useUserContext();

   if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
   }

   return <Outlet />;
}