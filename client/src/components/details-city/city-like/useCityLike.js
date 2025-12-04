import { useEffect, useState, useCallback } from "react";
import { useUserContext } from "../../../contexts/UserContext.js";
import useRequest from "../../../hooks/useRequest.js";

export default function useCityLike(cityId,) {
    const { request } = useRequest();
    const { user, isAuthenticated } = useUserContext();

    const [likes, setLikes] = useState(0);
    const [userLikeId, setUserLikeId] = useState(null);

    // load likes + user like on mount / change
    useEffect(() => {
        if (!cityId) return;

        const fetchLikes = async () => {

            // 1) total likes count
            const countQuery = encodeURIComponent(`cityId="${cityId}"`);
            const count = await request(`/data/likes?where=${countQuery}&count`);
            setLikes(count);

            // 2) does current user like it?
            if (isAuthenticated) {
                const userQuery = encodeURIComponent(`cityId="${cityId}" AND _ownerId="${user._id}"`);
                const result = await request(`/data/likes?where=${userQuery}`);

                if (Array.isArray(result) && result.length > 0) {
                    setUserLikeId(result[0]._id);
                } else {
                    setUserLikeId(null);
                }
            } else {
                setUserLikeId(null);
            }
        };

        fetchLikes()
            .catch(console.error);
    }, [cityId, isAuthenticated, user?._id, request]);

    const toggleLike = useCallback(async () => {
        if (!isAuthenticated) {
            alert("You need to be logged in to like.");
            return;
        }

        // add like
        if (!userLikeId) {
            const newLike = await request(
                "/data/likes",
                "POST",
                { cityId }
            );
            setLikes(prev => prev + 1);
            setUserLikeId(newLike._id);
        } else {
            // remove like
            await request(`/data/likes/${userLikeId}`, "DELETE");
            setLikes(prev => prev - 1);
            setUserLikeId(null);
        }
    }, [cityId, isAuthenticated, userLikeId, request]);

    return {
        likes,
        userHasLiked: !!userLikeId,
        toggleLike,
    };
}
