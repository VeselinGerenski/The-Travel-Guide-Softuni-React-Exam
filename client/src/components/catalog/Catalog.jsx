import { Link, useNavigate } from "react-router";

export default function Catalog() {
  const navigate = useNavigate();

  // TEMP data
  const cities = [
    {
      id: 1,
      name: "London",
      country: "United Kingdom",
      population: 8900000,
      description: "Foggy mornings, red buses and hidden bookshops.",
      imageUrl: "/images/cities/london.jpg",
      likes: 124,
    },
    {
      id: 2,
      name: "Paris",
      country: "France",
      population: 2148000,
      description: "Lantern-lit streets and cafe terraces along the Seine.",
      imageUrl: "/images/cities/paris.jpg",
      likes: 167,
    },
    {
      id: 3,
      name: "Rome",
      country: "Italy",
      population: 2873000,
      description: "Warm stone, winding alleys and ancient ruins.",
      imageUrl: "/images/cities/rome.jpg",
      likes: 142,
    },
    {
      id: 4,
      name: "Tokyo",
      country: "Japan",
      population: 13960000,
      description: "Neon-lit nights, temples, and endless energy.",
      imageUrl: "/images/cities/tokyo.jpg",
      likes: 188,
    },
  ];

  return (
    <div className="min-h-screen flex justify-center px-4 pt-5 pb-10">

      {/* section relative so X can sit inside it */}
      <section className="relative w-full max-w-5xl rounded-3xl bg-[#ebe6d9]/90 border border-white/40 px-10 py-10">

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
        <div className="grid gap-6 md:grid-cols-2">
          {cities.map((city) => (
            <article key={city.id} className="h-full">
              <div className="relative h-60 w-full overflow-hidden rounded-2xl bg-slate-900/10 group shadow-lg">

                {/* Image */}
                <img
                  src={city.imageUrl}
                  alt={city.name}
                  className="h-full w-full object-cover transform group-hover:scale-115 transition duration-700"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Text */}
                <div className="absolute inset-x-0 bottom-0 p-4 text-white pointer-events-none leading-tight">
                  <p className="text-[0.6rem] uppercase tracking-[0.25em] text-amber-300">
                    {city.country}
                  </p>

                  <h2 className="mt-0 text-xl font-semibold font-['Playfair_Display']">
                    {city.name}
                  </h2>

                  <p className="text-[0.7rem] text-amber-100/90">
                    {city.population.toLocaleString()} people · {city.likes} likes
                  </p>

                  <p className="mt-1 text-xs text-gray-200 italic line-clamp-2 leading-tight">
                    {city.description}
                  </p>
                </div>

                {/* View Details Button */}
                <Link to={`/details/${city.id}`}>
                  <button
                  
                    className="
                      opacity-0 group-hover:opacity-100
                      absolute left-1/2 top-1/2 
                      -translate-x-1/2 -translate-y-1/2 
                      rounded-full bg-white/90 px-4 py-2 
                      text-sm font-semibold text-slate-900 
                      shadow-md hover:bg-amber-600 hover:text-white 
                      transition duration-300
                      pointer-events-auto
                    "
                  >
                    View Details
                  </button>
                </Link>

              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
