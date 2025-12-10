import { useEffect, useState } from "react";
import { getProfileStats } from "./getProfileStats.js";
import useRequest from "../../hooks/useRequest.js";

export default function useProfileData(userId) {
  const { request } = useRequest();

  const [cities, setCities] = useState([]);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all data needed for the profile
  useEffect(() => {
    if (!userId) return;

    Promise.all([
      request("/data/cities"),
      request("/data/likes"),
      request(`/data/comments?where=_ownerId%3D%22${userId}%22`)
    ])
      .then(([citiesRes, likesRes, commentsRes]) => {
        setCities(Array.isArray(citiesRes) ? citiesRes : []);
        setLikes(Array.isArray(likesRes) ? likesRes : []);
        setComments(Array.isArray(commentsRes) ? commentsRes : []);
      })
      .catch(err => {
        alert(err.message);
      })
      .finally(() => {
        setIsLoading(false)
      });
  }, [request, userId]);

  // Calculate stats using util
  const stats = getProfileStats({
    cities,
    likes,
    comments,
    userId,
  });

  return {
    cities,
    likes,
    comments,
    isLoading,
    ...stats,
  };
}
