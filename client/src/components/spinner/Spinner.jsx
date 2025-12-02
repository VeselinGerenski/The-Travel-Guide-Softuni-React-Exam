export default function Spinner() {
  return (
    <div className="flex flex-col items-center py-10 gap-3">

      {/* Loading text */}
      <p className="text-xl text-slate-700 tracking-wide animate-pulse">
        Loading...
      </p>

      {/* Spinner */}
      <div
        className="
          w-10 h-10 
          border-4 border-amber-600 border-t-transparent 
          rounded-full 
          animate-spin-smooth
        "
      ></div>
    </div>
  );
}
