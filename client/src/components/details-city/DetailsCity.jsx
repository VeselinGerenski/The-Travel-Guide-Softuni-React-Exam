import { useParams, useNavigate, Link } from "react-router";
import CreateComment from "./create-comment/CreateComment.jsx";
import DetailsComment from "./details-comment/DetailsComment.jsx";

export default function DetailsCity() {
  const navigate = useNavigate();
  const { cityId } = useParams();

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
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start pt-10 px-3 pb-6 z-50"
      onClick={() => navigate(-1)}
    >
      <section
        className="w-full max-w-2xl rounded-2xl bg-[#f3ebdd]/95 border border-amber-900/20 shadow-[0_18px_45px_rgba(0,0,0,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* IMAGE */}
        <div className="relative">
          <img
            src={exampleCity.imageUrl}
            alt={exampleCity.name}
            className="h-55 w-full object-cover rounded-t-2xl"
          />
          <button
            onClick={() => navigate(-1)}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-amber-600 hover:text-white transition text-sm"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-4 space-y-4">
          <div className="text-center">
            <p className="text-[9px] uppercase tracking-[0.15em] text-amber-700">
              {exampleCity.country}
            </p>

            <h1 className="mt-1 text-3xl font-semibold text-slate-900 font-['Playfair_Display']">
              {exampleCity.name}
            </h1>

            <p className="mt-1 text-xs text-slate-700 italic">
              Population: {exampleCity.population.toLocaleString()} people
            </p>
          </div>

          <p className="text-[12px] text-slate-800 leading-relaxed text-center max-w-xl mx-auto">
            {exampleCity.description}
          </p>

          <div className="text-center text-amber-800 font-semibold text-xs">
            ❤️ {exampleCity.likes} travelers like this destination
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button className="px-4 py-1.5 rounded-full bg-amber-600 text-white text-xs font-semibold hover:bg-amber-500 transition shadow-sm">
               Like
            </button>

            <Link
              to={`/edit/${exampleCity.id}`}
              className="px-4 py-1.5 rounded-full bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition shadow-sm"
            >
              Edit
            </Link>

            <button className="px-4 py-1.5 rounded-full bg-red-700 text-white text-xs font-semibold hover:bg-red-600 transition shadow-sm">
              Delete
            </button>
          </div>

          {/* COMMENTS */}
          <div className="pt-2 border-t border-amber-900/20">
            <h2 className="text-sm font-semibold text-slate-900 mb-1">Comments</h2>
            <DetailsComment />
            <CreateComment />
          </div>

        </div>
      </section>
    </div>
  );
}
