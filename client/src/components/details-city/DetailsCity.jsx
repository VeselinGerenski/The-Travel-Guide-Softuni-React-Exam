import { useParams, useNavigate, Link } from "react-router";
import CreateComment from "./create-comment/CreateComment.jsx";
import DetailsComment from "./details-comment/DetailsComment.jsx";

export default function DetailsCity() {
  const navigate = useNavigate();
  const { cityId } = useParams();

  // TEMPORARY DATA
  const exampleCity = {
    id: cityId,
    name: "London",
    country: "United Kingdom",
    population: 8900000,
    description:
      "Foggy mornings, red buses and hidden bookshops. A timeless blend of history and modern life.",
    imageUrl: "/images/cities/london.jpg",
    likes: 124,
  };

  return (
    // BACKDROP
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center px-4 pt-15 pb-16 z-50"
      onClick={() => navigate(-1)}   // CLICK OUTSIDE → CLOSE
    >
      {/* DETAILS CARD */}
      <section
        className="w-full max-w-3xl rounded-3xl bg-[#f3ebdd]/95 border border-amber-900/20 shadow-[0_18px_45px_rgba(0,0,0,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}  // PREVENT BACKDROP CLOSE
      >

        {/* IMAGE */}
        <div className="relative">
          <img
            src={exampleCity.imageUrl}
            alt={exampleCity.name}
            className="h-60 w-full object-cover"
          />

          {/* CLOSE BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-slate-900 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-amber-600 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-10 py-8 space-y-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-700">
              {exampleCity.country}
            </p>

            <h1 className="mt-2 text-4xl font-semibold text-slate-900 font-['Playfair_Display']">
              {exampleCity.name}
            </h1>

            <p className="mt-2 text-sm text-slate-700 italic">
              Population: {exampleCity.population.toLocaleString()} people
            </p>
          </div>

          <p className="text-slate-800 leading-relaxed text-center max-w-2xl mx-auto">
            {exampleCity.description}
          </p>

          <div className="text-center text-amber-800 font-semibold text-sm">
            ❤️ {exampleCity.likes} travelers like this destination
          </div>

          <div className="flex justify-center gap-6 pt-4">
            <button className="px-5 py-2 rounded-full bg-amber-600 text-white font-semibold text-sm hover:bg-amber-500 transition shadow-md">
              ❤️ Like
            </button>

            <Link
              to={`/edit/${exampleCity.id}`}
              className="px-5 py-2 rounded-full bg-slate-800 text-white font-semibold text-sm hover:bg-slate-700 transition shadow-md"
            >
              Edit
            </Link>

            <button className="px-5 py-2 rounded-full bg-red-600 text-white font-semibold text-sm hover:bg-red-500 transition shadow-md">
              Delete
            </button>
          </div>

          {/* COMMENTS */}
          <div className="pt-3 border-t border-amber-900/20">
            <h2 className="text-l font-semibold text-slate-900 mb-2">Comments</h2>
            <CreateComment />
          </div>

        </div>
      </section>
    </div>
  );
}
