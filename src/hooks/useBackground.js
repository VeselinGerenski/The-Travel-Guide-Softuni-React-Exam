import { useLocation } from "react-router";

export default function useBackground() {

    const location = useLocation();
    const homeBg = ["/", "/login", "/register", "/destinations"].includes(location.pathname);

    const backGround = homeBg ? "home-bg" : "default-bg";

    return (
        backGround
    )
};


