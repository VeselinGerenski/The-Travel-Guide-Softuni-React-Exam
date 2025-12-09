import { useParams, useNavigate, Link } from "react-router";
import CreateComment from "./create-comment/CreateComment.jsx";
import DetailsComment from "./details-comment/DetailsComment.jsx";
import { useEffect, useState } from "react";

import useCityLike from "./city-like/useCityLike.js";

import { useUserContext } from "../../contexts/UserContext.js";
import useRequest from "../../hooks/useRequest.js";
import Spinner from "../spinner/Spinner.jsx";
import useValidation from "../../hooks/useValidation.js";

export default function DetailsCity({
  heightClass = "h-58"
}) {
  const { user, isAuthenticated } = useUserContext();
  const navigate = useNavigate();
  const { request } = useRequest();
  const { cityId } = useParams();

  const [city, setCity] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { likes, userHasLiked, toggleLike } = useCityLike(cityId, city?._ownerId);
  const { errors, setErrors } = useValidation();

  useEffect(() => {
    request(`/data/cities/${cityId}`)
      .then(result => {
        setCity(result)
      })
      .catch(err => {
        alert(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [cityId, request])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-700">
        <Spinner />
      </div>
    );
  };

  const deleteCityHandler = async (city) => {
    const isConfirmed = confirm(`Are you sure you want to delete ${city.name}?`);

    if (!isConfirmed) {
      return;
    }
    try {
      await request(`/data/cities/${cityId}`, 'DELETE')

      navigate(-1)
    } catch (err) {

      if (err.status === 403 || err.message.includes('Forbidden')) {
        setErrors((state) => ({
          ...state,
          global: 'You can only delete cities you added.'
        }))
        return;
      }

      alert(err.message);
    }

  };

  const refreshHandler = () => {
    setRefresh(state => !state);
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center px-3 py-3 z-50"
      onClick={() => navigate(-1)}
    >
      <section
        className="
    w-full max-w-2xl
    rounded-3xl                
    bg-[#f3ebdd]/95 
    border border-amber-900/20 
    shadow-[0_18px_45px_rgba(0,0,0,0.35)]
    overflow-hidden            /* important: clips the image to the radius */
  "
        onClick={(e) => e.stopPropagation()}
      >

        {/* IMAGE */}
        <div className="relative">
          <img
            src={city.imageUrl}
            alt={city.name}
            className={`${heightClass} w-full transform scale-115 origin-center`}
          />
          <button
            onClick={() => navigate(-1)}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-amber-600 hover:text-white transition text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-4 space-y-3">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.15em] text-amber-700 mt-3">
              {city.country}
            </p>

            <h1 className="mt-0.5 text-3xl font-semibold text-slate-900 font-['Playfair_Display']">
              {city.name}
            </h1>

            <p className="mt-1 text-xs text-slate-700 italic">
              Population: {city.population.toLocaleString()} people
            </p>
          </div>

          <p className="text-[12px] text-slate-800 leading-relaxed text-center max-w-xl mx-auto">
            {city.description}
          </p>

          <div className="text-center text-amber-800 font-semibold text-xs">
            ❤️ {likes === 1 ? `${likes} traveler likes this destination` : `${likes} travelers like this destination`}
          </div>

          {isAuthenticated && (
            <>
              <div className="flex justify-center gap-3">

                <button
                  className="px-4 py-1.5 rounded-full bg-amber-600 text-white text-xs font-semibold hover:bg-amber-500 transition shadow-sm cursor-pointer"
                  onClick={toggleLike}
                >
                  {userHasLiked ? "Unlike" : "Like"}
                </button>

                <Link
                  to={`/edit/${cityId}`}
                  className="px-4 py-1.5 rounded-full bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition shadow-sm"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteCityHandler(city)}
                  className="px-4 py-1.5 rounded-full bg-red-700 text-white text-xs font-semibold hover:bg-red-800 transition shadow-sm cursor-pointer"
                >
                  Delete
                </button>
              </div>

              {errors.global && (
                <p className="text-[13px] text-center text-red-600 mt-[-3px]">
                  {errors.global}
                </p>
              )}
            </>
          )}

          {/* COMMENTS */}
          <div className="pt-2 border-t border-amber-900/20">
            <h2 className="text-sm font-semibold text-slate-900 mb-1">Comments</h2>

            <div className="max-h-[300px] overflow-y-auto flex flex-col gap-2">
              <DetailsComment cityId={cityId} refresh={refresh} refreshHandler={refreshHandler} />
            </div>

            {isAuthenticated && (
              <CreateComment
                user={user}
                cityId={cityId}
                onCreate={refreshHandler}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
