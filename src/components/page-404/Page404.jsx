import { useNavigate } from "react-router";

export default function Page404() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* TRANSPARENT CARD */}
      <div className="bg-[#ebe6d9]/75  backdrop-blur-md rounded-4xl shadow-[0_18px_45px_rgba(0,0,0,0.35)] p-8 max-w-md text-center w-full">
        <h1 className="text-6xl font-bold text-amber-700 mb-4">404</h1>
        <p className="text-lg text-slate-900 mb-4">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="text-sm text-slate-700 mb-6">
          It might have been moved, deleted, or never existed.
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-full bg-amber-600 text-white font-semibold hover:bg-amber-500 transition shadow-md"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
