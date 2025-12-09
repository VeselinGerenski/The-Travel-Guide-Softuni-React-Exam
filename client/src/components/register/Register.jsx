import { Link, useNavigate } from "react-router";
import useForm from "../../hooks/useForm.js";
import { useUserContext } from "../../contexts/UserContext.js";
import useValidation from "../../hooks/useValidation.js";
import { validateRegister } from "../../utils/validators.js";


export default function Register() {
  const { registerHandler } = useUserContext();
  const navigate = useNavigate();
  const { errors, validate, setErrors } = useValidation(validateRegister);

  const registerSubmitHandler = async (values) => {
    const { fullName, email, password } = values;

    const clientErrors = validate(values);
    if (Object.keys(clientErrors).length > 0) {
      return;
    }

    try {
      await registerHandler(fullName, email, password);

      navigate("/");
    } catch (err) {
      if (err.status === 409 || err.message?.includes('exists')) {
        setErrors((prev) => ({
          ...prev,
          email: 'This email is already used'
        }))
        return;
      }
      alert(err.message)
    }
  
  };
  const { register, formAction } = useForm(registerSubmitHandler, {
    fullName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
      <form
        action={formAction}
        className="w-full max-w-lg rounded-[32px] bg-[#f3ebdd]/75 backdrop-blur-md border border-amber-900/20 shadow-[0_18px_45px_rgba(0,0,0,0.35)] px-10 py-8 space-y-5"
      >
        {/* Letter header */}
        <div className="flex items-center justify-between border-b border-amber-900/20 pb-3 mb-3 text-[11px] uppercase tracking-[0.25em] text-amber-900/80">
          <span>From: The Travel Guide</span>
          <span>To: New Traveler</span>
        </div>

        {/* Greeting + title */}
        <div className="space-y-1 text-center">
          <p className="italic text-sm text-slate-700">Dear Future Explorer,</p>
          <h2 className="text-3xl font-semibold text-slate-900 font-['Playfair_Display']">
            Create Your Passport
          </h2>
          <p className="text-xs text-slate-600">
            Fill in this letter to begin your adventures with us.
          </p>
        </div>

        {/* Full name */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-amber-900/90">
            Fullname
          </label>
          <input
            type="text"
            placeholder="First and last name"
            {...register("fullName")}
            className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm text-slate-800 focus:outline-none focus:border-amber-600 placeholder:text-slate-400 cursor-pointer"
          />
          {errors.fullName && (
            <p className="text-[11px] text-red-600 mt-1">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-amber-900/90">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm text-slate-800 focus:outline-none focus:border-amber-600 placeholder:text-slate-400 cursor-pointer"
          />
          {errors.email && (
            <p className="text-[11px] text-red-600 mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-amber-900/90">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm text-slate-800 focus:outline-none focus:border-amber-600 placeholder:text-slate-400 cursor-pointer"
          />
          {errors.password && (
            <p className="text-[11px] text-red-600 mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* Repeat Password */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-amber-900/90">
            Repeat Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            {...register("repeatPassword")}
            className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm text-slate-800 focus:outline-none focus:border-amber-600 placeholder:text-slate-400 cursor-pointer"
          />
          {errors.repeatPassword && (
            <p className="text-[11px] text-red-600 mt-1">
              {errors.repeatPassword}
            </p>
          )}
        </div>

        {/* Register button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full rounded-full bg-amber-700 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-amber-600 transition cursor-pointer"
          >
            Register &amp; Sign in
          </button>
        </div>

        {/* Extra links */}
        <div className="pt-2 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-700">Already have an account?</span>
            <Link
              to="/login"
              className="font-semibold text-amber-800 hover:text-amber-600 underline underline-offset-4"
            >
              Click here to Login
            </Link>
          </div>
        </div>

      </form>
    </div>
  );
}
