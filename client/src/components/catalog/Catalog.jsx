import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import CityCard from "../city-card/CityCard.jsx";

export default function Catalog() {
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3030/jsonstore/cities')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }
        return response.json();
      })
      .then(result => {
        setCities(Object.values(result));
      })
      .catch(err => {
        alert(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
            z-50
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
          <p className="text-center text-slate-700">Loading...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {cities.map(city => (
              <CityCard key={city._id} {...city} />
            ))}
          </div>
        )}

      </section >
    </div >
  );
}
