import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CityCard from "../city-card/CityCard.jsx";
import useRequest from "../../hooks/useRequest.js";
import Spinner from "../spinner/Spinner.jsx";
import usePagination from "../../hooks/usePagination.js";
import useSearchCity from "../../hooks/useSearchCity.js";

export default function Destinations() {
  const navigate = useNavigate();
  const { request } = useRequest();
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { searchTerm, onSearchChange, filteredCities, } = useSearchCity(cities);

  const pageSize = 4;
  const {
    currentPage,
    totalPages,
    itemsOnPage: citiesOnPage,
    handlePrev,
    handleNext,
    setCurrentPage,
  } = usePagination(filteredCities, pageSize);

  useEffect(() => {
    request("/data/cities")
      .then(result => {
        setCities(result);
      })
      .catch(err => {
        alert(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [request]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, setCurrentPage]);

  return (
    <div className="flex justify-center px-4 pt-2 pb-0">
      <section className="relative w-full max-w-[900px] rounded-3xl bg-[#ebe6d9]/85 border border-white/40 px-10 py-10">

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

        {/* Header */}
        <div className="mb-2 text-center">

          <p className="text-xs uppercase tracking-[0.25em] text-amber-700">
            The Travel Guide
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 font-['Playfair_Display']">
            All Destinations
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Every destination we offer — discover the stories behind each city.
          </p>
        </div>

        {/* Search */}
        <div className="absolute right-[110px] top-[65px] z-50">
          <div className="relative">
            {/* Optional search icon */}
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[12px]">
              🔍
            </span>

            <input
              type="text"
              value={searchTerm}
              onChange={onSearchChange}
              placeholder="Search by city or country"
              className="w-50 pl-8 pr-4 py-2 text-xs leading-normal rounded-full border border-amber-700/60 bg-white/80 text-slate-800 placeholder:text-slate-400 cursor-text focus:outline-none focus:ring-2 focus:ring-amber-600/70 focus:bg-white focus:border-amber-600 shadow-sm hover:shadow-md transition-all duration-200"
            />
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[506px]">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 min-h-[456px]">
              {citiesOnPage.map(city => (
                <CityCard
                  key={city._id}
                  {...city}
                  heightClass="h-54"
                />
              ))}
            </div>

            {/* Empty state */}
            {cities.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">
                  Oops! No Cities Found
                </h2>
                <p className="text-lg text-amber-700 mb-2">
                  It looks like we don't have any cities to show right now.
                </p>
              </div>
            )}

            {/* Pagination controls */}
            {cities.length > 0 && (
              <div className="mt-5 flex items-center justify-center gap-4">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold border border-amber-700 text-amber-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-700 hover:text-white transition cursor-pointer"
                >
                  Previous
                </button>

                <span className="text-xs text-slate-700">
                  Page {currentPage} of {totalPages || 1}
                </span>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold border border-amber-700 text-amber-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-700 hover:text-white transition cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
