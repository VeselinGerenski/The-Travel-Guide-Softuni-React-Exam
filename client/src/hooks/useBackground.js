import { useLocation } from "react-router";

export default function useBackground() {

    const location = useLocation();
    const homeBg = location.pathname === "/"  || location.pathname === "/login"  || location.pathname === "/register";
    const backGround = homeBg ? "home-bg" : "default-bg";
    
    return (
        backGround
    )
};