import { Link } from "react-router";

export default function CityCard({
  _id,
  name,
  country,
  population,
  imageUrl,
  description,
  likes,
}) {
  return (
    <article className="h-full">
      <div className="relative h-60 w-full overflow-hidden rounded-2xl bg-slate-900/10 group shadow-lg">

        {/* Image */}
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transform group-hover:scale-110 transition duration-700"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Text */}
        <div className="absolute inset-x-0 bottom-0 p-4 text-white pointer-events-none leading-tight">
          <p className="text-[0.6rem] uppercase tracking-[0.25em] text-amber-300">
            {country}
          </p>

          <h2 className="mt-0 text-xl font-semibold font-['Playfair_Display']">
            {name}
          </h2>

          <p className="text-[0.7rem] text-amber-100/90">
            {population?.toLocaleString()} people · {likes} likes
          </p>

          <p className="mt-1 text-xs text-gray-200 italic line-clamp-2 leading-tight">
            {description}
          </p>
        </div>

        {/* View Details Button */}
        <Link to={`/details/${_id}`}>
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
  );
}
