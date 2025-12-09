import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useRequest from "../../hooks/useRequest.js";
import useForm from "../../hooks/useForm.js";
import useValidation from "../../hooks/useValidation.js";
import { validateCity } from "../../utils/validators.js";

export default function EditCity() {
  const navigate = useNavigate();
  const { cityId } = useParams();
  const { request } = useRequest();
  const { errors, validate, setErrors } = useValidation(validateCity)

  const EditCityHandler = async (values) => {
    const clientErrors = validate(values)

    if (Object.keys(clientErrors).length > 0) {
      return;
    }

    try {
      await request(`/data/cities/${cityId}`, 'PUT', values)

      navigate(-1)
    } catch (err) {

      if (err.status === 403 || err.message?.includes('Forbidden')) {
        setErrors((state) => ({
          ...state,
          form: "You can only edit cities you added."
        }))
        return;
      }

      alert(err.message);
    }
  }

  const { register, setValues, formAction } = useForm(EditCityHandler, {
    name: "",
    country: "",
    population: "",
    imageUrl: "",
    description: "",
  })

  useEffect(() => {
    request(`/data/cities/${cityId}`)
      .then(result => {
        setValues(result)
      })
      .catch(err => {
        alert(err.message)
      })
  }, [cityId, request, setValues])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-22 pb-10">
      <form
        action={formAction}
        className="w-full max-w-2xl rounded-[32px] bg-[#f3ebdd]/75 backdrop-blur-md border border-amber-900/20 shadow-[0_18px_45px_rgba(0,0,0,0.35)] px-12 py-10 space-y-6"
      >
        {/* letter header */}
        <div className="flex items-center justify-between border-b border-amber-900/20 pb-3 mb-3 text-[11px] uppercase tracking-[0.25em] text-amber-900/80">
          <span>From: The Travel Guide</span>
          <span>To: City Records Dept.</span>
        </div>
        <h1 className="text-4xl text-center font-['Playfair_Display'] font-semibold text-slate-900">
          Edit City
        </h1>

        {/* City Name & Country (row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          <div>
            <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase">
              City Name
            </label>
            <input
              type="text"
              {...register('name')}
              className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm focus:outline-none focus:border-amber-600 cursor-pointer"
              placeholder="e.g. Tokyo"
            />
            {errors.name && (
              <p className="text-[11px] text-red-600 mt-1 text-center">
                {errors.name}
              </p>)}
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase">
              Country
            </label>
            <input
              type="text"
              {...register('country')}
              className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm focus:outline-none focus:border-amber-600 cursor-pointer"
              placeholder="e.g. Japan"
            />
            {errors.country && (
              <p className="text-[11px] text-red-600 mt-1 text-center">
                {errors.country}
              </p>)}
          </div>
        </div>

        {/* Population & Image URL (row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase">
              Population
            </label>
            <input
              type="number"
              {...register('population')}
              className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm focus:outline-none focus:border-amber-600 cursor-pointer"
              placeholder="e.g. 37400000"
            />
            {errors.population && (
              <p className="text-[11px] text-red-600 mt-1 text-center">
                {errors.population}
              </p>)}
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase">
              Image URL
            </label>
            <input
              type="text"
              {...register('imageUrl')}
              className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm focus:outline-none focus:border-amber-600 cursor-pointer"
              placeholder="Direct link to an image"
            />
            {errors.imageUrl && (
              <p className="text-[11px] text-red-600 mt-1 text-center">
                {errors.imageUrl}
              </p>)}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase text-center">
            Description
          </label>
          <textarea
            rows={1}
            {...register('description')}
            className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm leading-relaxed focus:outline-none focus:border-amber-600 cursor-pointer text-center"
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
          className="w-full rounded-full bg-amber-700 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-amber-600 cursor-pointer transition"
        >
          Save Changes
        </button>
        {errors.form && (
          <div className="text-[14px] text-red-600 text-center mt-[-15px]">
            {errors.form}
            <Link
              to={-1}
              className="ml-3 text-slate-900 inline-flex hover:text-slate-700 text-[17px]"
            >
              <p className="underline">Go back </p>
              <p className="ml-1 text-[15px]">←</p>
            </Link>
          </div>)}
      </form>
    </div>
  );
}
