import { Link } from "react-router";

export default function CityActionsBar({
  cityId,
  cityName,
  likes,
  userHasLiked,
  isAuthenticated,
  toggleLike,
  deleteCity,
  errors,
}) {
  return (
    <div className="px-6 pb-4 space-y-3">

      {/* LIKE COUNT */}
      <div className="text-center text-amber-800 font-semibold text-xs">
        ❤️ {likes === 1
          ? `${likes} traveler likes this destination`
          : `${likes} travelers like this destination`}
      </div>

      {/* ACTION BUTTONS */}
      {isAuthenticated && (
        <>
          <div className="flex justify-center gap-3">

            {/* LIKE BUTTON */}
            <button
              className="px-4 py-1.5 rounded-full bg-amber-600 text-white text-xs font-semibold hover:bg-amber-500 transition shadow-sm cursor-pointer"
              onClick={toggleLike}
            >
              {userHasLiked ? "Unlike" : "Like"}
            </button>

            {/* EDIT */}
            <Link
              to={`/edit/${cityId}`}
              className="px-4 py-1.5 rounded-full bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition shadow-sm"
            >
              Edit
            </Link>

            {/* DELETE */}
            <button
              onClick={() => deleteCity(cityId, cityName)}
              className="px-4 py-1.5 rounded-full bg-red-700 text-white text-xs font-semibold hover:bg-red-800 transition shadow-sm cursor-pointer"
            >
              Delete
            </button>
          </div>

          {/* ERROR MESSAGE */}
          {errors?.global && (
            <p className="text-[13px] text-center text-red-600 mt-[-3px]">
              {errors.global}
            </p>
          )}
        </>
      )}
    </div>
  );
}
