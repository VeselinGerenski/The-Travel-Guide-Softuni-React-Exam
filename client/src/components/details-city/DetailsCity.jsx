import { useParams, useNavigate, Link } from "react-router";
import CreateComment from "./create-comment/CreateComment.jsx";
import DetailsComment from "./details-comment/DetailsComment.jsx";
import { useEffect, useState } from "react";
import useRequest from "../../hooks/useRequest.js";
import { useUserContext } from "../../contexts/UserContext.js";

export default function DetailsCity({
  heightClass = "h-65"
}) {
  const { user, isAuthenticated } = useUserContext();
  const navigate = useNavigate();
  const { request } = useRequest();
  const { cityId } = useParams();

  const [city, setCity] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        Loading city details...
      </div>
    );
  }

  const deleteCityHandler = async (city) => {

    const isConfirmed = confirm(`Are you sure you want to delete ${city.name}?`);

    if (!isConfirmed) {
      return;
    }

    try {
      await request(`/data/cities/${cityId}`, 'DELETE')

      navigate(-1)
    } catch (err) {
      alert(err.message)
    }
  };

  const refreshHandler = () => {
    setRefresh(state => !state);
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start pt-5 px-3 pb-5 z-50"
      onClick={() => navigate(-1)}
    >
      <section
        className="w-full max-w-2xl rounded-2xl bg-[#f3ebdd]/95 border border-amber-900/20 shadow-[0_18px_45px_rgba(0,0,0,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* IMAGE */}
        <div className="relative">
          <img
            src={city.imageUrl}
            alt={city.name}
            className={`${heightClass} w-full object-cover rounded-t-2xl`}
          />
          <button
            onClick={() => navigate(-1)}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-amber-600 hover:text-white transition text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-4 space-y-4">
          <div className="text-center">
            <p className="text-[9px] uppercase tracking-[0.15em] text-amber-700">
              {city.country}
            </p>

            <h1 className="mt-1 text-3xl font-semibold text-slate-900 font-['Playfair_Display']">
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
            ❤️ {city.likes} travelers like this destination
          </div>

          <div
            className="flex justify-center gap-3">
            <button className="px-4 py-1.5 rounded-full bg-amber-600 text-white text-xs font-semibold hover:bg-amber-500 transition shadow-sm cursor-pointer">
              Like
            </button>

            <Link
              to={`/edit/${cityId}`}
              className="px-4 py-1.5 rounded-full bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition shadow-sm"
            >
              Edit
            </Link>

            <button
              onClick={() => deleteCityHandler(city)}
              className="px-4 py-1.5 rounded-full bg-red-700 text-white text-xs font-semibold hover:bg-red-600 transition shadow-sm cursor-pointer">
              Delete
            </button>
          </div>


          {/* COMMENTS */}
          <div className="pt-2 border-t border-amber-900/20">
            <h2 className="text-sm font-semibold text-slate-900 mb-1">Comments</h2>

            <div className="max-h-[300px] overflow-y-auto flex flex-col gap-2">
              <DetailsComment cityId={cityId} refresh={refresh} />
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
