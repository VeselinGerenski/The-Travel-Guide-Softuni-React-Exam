import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useUserContext } from "../../contexts/UserContext.js";
import useRequest from "../../hooks/useRequest.js";
import CityCard from "../city-card/CityCard.jsx";
import Spinner from "../spinner/Spinner.jsx";

export default function Profile() {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { request } = useRequest();

    const [isLoading, setIsLoading] = useState(true);
    const [cities, setCities] = useState([]);
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (!user?._id) return;

        // Load everything we need for the profile
        Promise.all([
            request("/data/cities"),
            request("/data/likes"),
            request(`/data/comments?where=_ownerId%3D%22${user._id}%22`)
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
                setIsLoading(false);
            });
    }, [request, user?._id]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                You must be logged in to view your profile.
            </div>
        );
    }

    // ----- STATS LOGIC -----

    // Likes given by this user
    const likesGiven = likes.filter(l => l._ownerId === user._id);

    // Cities created by this user
    const myCities = cities.filter(c => c._ownerId === user._id);

    // Likes received on my cities
    const myCityIds = new Set(myCities.map(c => c._id));
    const likesReceived = likes.filter(l => myCityIds.has(l.cityId));

    // Liked cities list (from likesGiven)
    const likedCityIds = Array.from(new Set(likesGiven.map(l => l.cityId)));
    const likedCities = cities.filter(c => likedCityIds.includes(c._id));

    // Recent comments (sort by createdOn desc)
    const recentComments = [...comments]
        .sort((a, b) => b._createdOn - a._createdOn)
        .slice(0, 5);

    return (
        <div className="min-h-screen flex justify-center px-4 pt-5 pb-10">
            {/* MAIN CARD – same style as Catalog */}
            <section className="relative w-full max-w-5xl rounded-3xl bg-[#ebe6d9]/85 border border-white/40 px-10 py-10 shadow-[0_0_60px_rgba(0,0,0,0.18)]">

                {/* X CLOSE BUTTON */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(-1);
                    }}
                    className="
            absolute top-5 right-5 
            bg-white/90 backdrop-blur-md 
            text-slate-900 w-10 h-10 
            flex items-center justify-center 
            rounded-full shadow-lg 
            hover:bg-amber-600 hover:text-white 
            transition font-semibold text-lg
            z-50 cursor-pointer
          "
                >
                    ✕
                </button>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        {/* HEADER */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                            {/* Avatar placeholder */}
                            <div className="w-20 h-20 rounded-full bg-amber-700/80 text-white flex items-center justify-center text-2xl font-semibold shadow-md">
                                {user.fullName?.[0]?.toUpperCase()}
                            </div>

                            <div className="text-center md:text-left">
                                <p className="text-[12px] uppercase tracking-[0.25em] text-amber-700">
                                    Traveler Profile
                                </p>
                                <h1 className="mt-1 text-2xl md:text-3xl font-semibold text-slate-900 font-['Playfair_Display']">
                                    {user.fullName}
                                </h1>
                                <h2 className="mt-1 text-1xl font-semibold text-slate-900 font-['Playfair_Display']">
                                    email: {user.email}
                                </h2>
                            </div>
                        </div>

                        {/* STATS */}
                        <div className="grid gap-4 md:grid-cols-4 mb-8">
                            <div className="rounded-2xl bg-white/70 border border-amber-900/10 px-4 py-3 text-center shadow-sm">
                                <p className="text-[10px] uppercase tracking-[0.15em] text-amber-700">
                                    Likes Given
                                </p>
                                <p className="mt-1 text-xl font-semibold text-slate-900">
                                    {likesGiven.length}
                                </p>
                            </div>
                            <div className="rounded-2xl bg-white/70 border border-amber-900/10 px-4 py-3 text-center shadow-sm">
                                <p className="text-[10px] uppercase tracking-[0.15em] text-amber-700">
                                    Likes Received
                                </p>
                                <p className="mt-1 text-xl font-semibold text-slate-900">
                                    {likesReceived.length}
                                </p>
                            </div>
                            <div className="rounded-2xl bg-white/70 border border-amber-900/10 px-4 py-3 text-center shadow-sm">
                                <p className="text-[10px] uppercase tracking-[0.15em] text-amber-700">
                                    Comments
                                </p>
                                <p className="mt-1 text-xl font-semibold text-slate-900">
                                    {comments.length}
                                </p>
                            </div>
                            <div className="rounded-2xl bg-white/70 border border-amber-900/10 px-4 py-3 text-center shadow-sm">
                                <p className="text-[10px] uppercase tracking-[0.15em] text-amber-700">
                                    Cities Created
                                </p>
                                <p className="mt-1 text-xl font-semibold text-slate-900">
                                    {myCities.length}
                                </p>
                            </div>
                        </div>

                        {/* CONTENT SECTIONS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Liked Cities */}
                            <div className="md:col-span-2">
                                {/* Heading row */}
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-base font-semibold text-slate-900">
                                        ❤️ Cities you liked
                                    </h2>

                                    <Link
                                        to="/catalog"
                                        className="text-xs sm:text-sm font-medium text-amber-700 underline underline-offset-2 hover:text-amber-900 transition"
                                    >
                                        All Destinations →
                                    </Link>
                                </div>

                                {likedCities.length === 0 ? (
                                    <p className="text-xs text-slate-600">
                                        You haven’t liked any cities yet. Start exploring!
                                    </p>
                                ) : (
                                    <div className="overflow-x-auto pb-2">
                                        <div className="flex gap-4 snap-x snap-mandatory">
                                            {likedCities.map(city => (
                                                <div
                                                    key={city._id}
                                                    className="snap-start shrink-0 w-[70%] sm:w-[48%]"
                                                >
                                                    <CityCard
                                                        {...city}
                                                        heightClass="h-75"   // vertical big version
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Recent Comments */}
                            <div>
                                <h2 className="text-base font-semibold text-slate-900 mb-3">
                                    💬 Your recent comments
                                </h2>

                                {recentComments.length === 0 ? (
                                    <p className="text-xs text-slate-600">
                                        You haven’t posted any comments yet.
                                    </p>
                                ) : (
                                    <div className="flex flex-col gap-3 max-h-[260px] overflow-y-auto pr-1">
                                        {recentComments.map(comment => {
                                            const city = cities.find(c => c._id === comment.cityId);

                                            return (
                                                <div
                                                    key={comment._id}
                                                    className="font-bold rounded-xl bg-white/80 border border-amber-900/10 px-3 py-2.5 shadow-sm text-xs break-words"
                                                >
                                                    <p className="text-slate-800 mb-1">
                                                        {comment.message || comment.comment || "(no text)"}
                                                    </p>
                                                    <div className="flex justify-between items-center text-[11px] text-amber-700">
                                                        <span>
                                                            {city ? (
                                                                <Link
                                                                    to={`/details/${city._id}`}
                                                                    className="hover:underline hover:text-amber-900"
                                                                >
                                                                    On {city.name}
                                                                </Link>
                                                            ) : (
                                                                "Unknown city"
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}
