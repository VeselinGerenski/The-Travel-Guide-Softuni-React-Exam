import { useEffect } from "react";
import { useUserContext } from "../../../contexts/UserContext.js";
import { useNavigate } from "react-router";

export default function Logout() {
    const { logoutHandler } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {

        logoutHandler(),
            navigate('/')

    }, [logoutHandler, navigate])

    return null;
};