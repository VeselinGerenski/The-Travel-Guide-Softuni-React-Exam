export default function CityInfoBlock({ city, heightClass = "h-58", onClose }) {
  return (
    <>
      {/* IMAGE */}
      <div className="relative">
        <img
          src={city.imageUrl}
          alt={city.name}
          className={`${heightClass} w-full transform scale-105 origin-center`}
        />
        <button
          onClick={onClose}
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

      </div>
    </>
  );
}
