
import { useNavigate } from "react-router";
import useForm from "../../hooks/useForm.js";
import useRequest from "../../hooks/useRequest.js";
import useValidation from "../../hooks/useValidation.js";
import { validateCity } from "../../utils/validators.js";

export default function CreateCity() {
  const navigate = useNavigate();
  const { request } = useRequest();
  const { errors, validate } = useValidation(validateCity);

  const createCityHandler = async (values) => {
    const clientErrors = validate(values)

    if (Object.keys(clientErrors).length > 0) {
      return;
    }

    const data = values;
    data.population = Number(data.population);

    try {
      await request('/data/cities', 'POST', data)

      navigate('/catalog')
    } catch (err) {
      alert(err.message || 'Failed to create city')
    }
  }

  const { register, formAction } = useForm(createCityHandler, {
    name: "",
    country: "",
    population: "",
    imageUrl: "",
    description: "",
  });

  return (
    <div className="min-h-screen flex items-center cursor-pointer justify-center cursor-pointer px-4 pt-22 pb-10">
      <form action={formAction}
        className="w-full max-w-2xl rounded-[32px] bg-[#f3ebdd]/75 backdrop-blur-md border border-amber-900/20 shadow-[0_18px_45px_rgba(0,0,0,0.35)] px-12 py-10 space-y-8"
      >
        {/* Letter header */}
        <div className="flex items-center cursor-pointer justify-between border-b border-amber-900/20 pb-3 mb-2 text-[11px] uppercase tracking-[0.25em] text-amber-900/80">
          <span>From: The Travel Guide</span>
          <span>To: City Records Dept.</span>
        </div>
        <h1 className="text-4xl text-center cursor-pointer font-['Playfair_Display'] font-semibold text-slate-900">
          Add a New City
        </h1>

        {/* -------------------- ROW 1: Name + Country -------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* City Name */}
          <div>
            <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase text-center cursor-pointer">
              City Name
            </label>
            <input
              type="text"
              {...register('name')}
              className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm focus:outline-none focus:border-amber-600 text-center cursor-pointer"
              placeholder="e.g. Tokyo"
            />
            {errors.name && (
              <p className="text-[11px] text-red-600 mt-1 text-center">
                {errors.name}
              </p>)}
          </div>

          {/* Country */}
          <div>
            <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase text-center cursor-pointer">
              Country
            </label>
            <input
              type="text"
              {...register('country')}
              className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm focus:outline-none focus:border-amber-600 text-center cursor-pointer"
              placeholder="e.g. Japan"
            />
            {errors.country && (
              <p className="text-[11px] text-red-600 mt-1 text-center">
                {errors.country}
              </p>)}
          </div>
        </div>

        {/* -------------------- ROW 2: Population + Image URL -------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Population */}
          <div>
            <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase text-center cursor-pointer">
              Population
            </label>
            <input
              type="number"
              {...register('population')}
              className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm focus:outline-none focus:border-amber-600 text-center cursor-pointer"
              placeholder="e.g. 37400000"
            />
            {errors.population && (
              <p className="text-[11px] text-red-600 mt-1 text-center">
                {errors.population}
              </p>)}
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase text-center cursor-pointer">
              Image URL
            </label>
            <input
              type="text"
              {...register('imageUrl')}
              className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm focus:outline-none focus:border-amber-600 text-center cursor-pointer"
              placeholder="Direct link to an image"
            />
            {errors.imageUrl && (
              <p className="text-[11px] text-red-600 mt-1 text-center">
                {errors.imageUrl}
              </p>)}
          </div>
        </div>

        {/* -------------------- ROW 3: Description (full width) -------------------- */}
        <div>
          <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase text-center cursor-pointer">
            Description
          </label>
          <textarea
            rows="1"
            {...register('description')}
            className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm leading-relaxed focus:outline-none focus:border-amber-600 text-center cursor-pointer "
            placeholder="Describe this city..."
          />
          {errors.description && (
            <p className="text-[11px] text-red-600 mt-1 text-center">
              {errors.description}
            </p>)}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-full bg-amber-700 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-amber-600 transition cursor-pointer"
        >
          Add City
        </button>
      </form>
    </div>
  );
}
