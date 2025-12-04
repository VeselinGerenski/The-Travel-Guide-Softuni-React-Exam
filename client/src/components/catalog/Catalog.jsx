import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CityCard from "../city-card/CityCard.jsx";
import useRequest from "../../hooks/useRequest.js";
import Spinner from "../spinner/Spinner.jsx";

export default function Catalog() {
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { request } = useRequest();

  const pageSize = 6; // 👈 6 cities per page

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

  // total pages
  const totalPages = Math.ceil(cities.length / pageSize);

  // cities to show on this page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const citiesOnPage = cities.slice(startIndex, endIndex);

  const handlePrev = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen flex justify-center px-4 pt-5 pb-10">
      {/* section relative so X can sit inside it */}
      <section className="relative w-full max-w-5xl rounded-3xl bg-[#ebe6d9]/85 border border-white/40 px-10 py-10">

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
        <div className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-700">
            The Travel Guide
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 font-['Playfair_Display']">
            All Destinations
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Every destination we offer — discover the stories behind each city.
          </p>
        </div>

        {/* Grid */}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              {citiesOnPage.map(city => (
                <CityCard
                  key={city._id}
                  {...city}
                  heightClass="h-60"
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
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="
                    px-4 py-1.5 rounded-full text-xs font-semibold 
                    border border-amber-700 text-amber-700 
                    disabled:opacity-40 disabled:cursor-not-allowed
                    hover:bg-amber-700 hover:text-white transition
                  "
                >
                  Previous
                </button>

                <span className="text-xs text-slate-700">
                  Page {currentPage} of {totalPages || 1}
                </span>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="
                    px-4 py-1.5 rounded-full text-xs font-semibold 
                    border border-amber-700 text-amber-700 
                    disabled:opacity-40 disabled:cursor-not-allowed
                    hover:bg-amber-700 hover:text-white transition
                  "
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
