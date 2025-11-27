import { Link, useNavigate } from "react-router";
import useControlledForm from "../../hooks/useControlledForm.js";
import UserContext from "../../contexts/UserContext.js";
import { useContext } from "react";


export default function Login() {
  const { onLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const { values, changeHandler, submitHandler } = useControlledForm({ email: '', password: '' }, async (values) => {
    const { email, password } = values;

    const response = await fetch('http://localhost:3030/users/login', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json()

    onLogin(result);
    navigate('/')
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-15 pb-10">
      <form onSubmit={submitHandler}

        className="w-full max-w-lg rounded-[32px] bg-[#f3ebdd]/75 backdrop-blur-md border border-amber-900/20 shadow-[0_18px_45px_rgba(0,0,0,0.35)] px-10 py-8 space-y-5"
      >
        {/* Letter header */}
        <div className="flex items-center justify-between border-b border-amber-900/20 pb-3 mb-3 text-[11px] uppercase tracking-[0.25em] text-amber-900/80">
          <span>From: The Travel Guide</span>
          <span>To: Returning Traveler</span>
        </div>

        {/* Greeting + title */}
        <div className="space-y-1 text-center">
          <p className="italic text-sm text-slate-700">
            Dear traveler,
          </p>
          <h2 className="text-3xl font-semibold text-slate-900 font-['Playfair_Display']">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-600">
            Sign this little letter to continue your journey.
          </p>
        </div>

        {/* Email */}
        <div className="mt-4 space-y-1">
          <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-amber-900/90">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={changeHandler}
            placeholder="you@example.com"
            className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm text-slate-800 focus:outline-none focus:border-amber-600 placeholder:text--slate-400 cursor-pointer"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-amber-900/90">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={changeHandler}
            placeholder="••••••••"
            className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm text-slate-800 focus:outline-none focus:border-amber-600 placeholder:text--slate-400 cursor-pointer"
          />
        </div>

        {/* Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full rounded-full bg-amber-700 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-amber-600 transition cursor-pointer"
          >
            Log In
          </button>
        </div>

        {/* Extra links */}
        <div className="pt-2 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-700">Not registered yet?</span>
            <Link
              to="/register"
              className="font-semibold text-amber-800 hover:text-amber-600 underline underline-offset-4"
            >
              Create your account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
