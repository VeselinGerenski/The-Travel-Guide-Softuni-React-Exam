import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function EditCity() {
  const navigate = useNavigate();
  const { cityId } = useParams();
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3030/jsonstore/cities/${cityId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Unable to edit city");
        }
        return response.json()
      })
      .then(result => {
        setFormValues(result)
      })
      .catch(err => {
        alert(err.message)
      })
  }, [cityId])

  const changeHandler = (e) => {
    setFormValues((state) => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3030/jsonstore/cities/${cityId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      })

      if (!response.ok) {
        throw new Error("Failed to update city");
      }

      navigate(`/details/${cityId}`)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-22 pb-10">
      <form onSubmit={submitHandler}

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
          {/* City Name */}
          <div>
            <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase">
              City Name
            </label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={changeHandler}
              required
              className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm focus:outline-none focus:border-amber-600"
              placeholder="e.g. Tokyo"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formValues.country}
              onChange={changeHandler}
              required
              className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm focus:outline-none focus:border-amber-600"
              placeholder="e.g. Japan"
            />
          </div>
        </div>

        {/* Population & Image URL (row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Population */}
          <div>
            <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase">
              Population
            </label>
            <input
              type="number"
              name="population"
              value={formValues.population}
              onChange={changeHandler}
              required
              className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm focus:outline-none focus:border-amber-600"
              placeholder="e.g. 37400000"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              value={formValues.imageUrl}
              onChange={changeHandler}
              required
              className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm focus:outline-none focus:border-amber-600"
              placeholder="Direct link to an image"
            />
          </div>
        </div>

        {/* Description (full width, last row) */}
        <div>
          <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase text-center">
            Description
          </label>
          <textarea
            name="description"
            value={formValues.description}
            onChange={changeHandler}
            required
            rows="2"
            className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm leading-relaxed focus:outline-none focus:border-amber-600 text-center"
            placeholder="Describe this city..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-full bg-amber-700 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-amber-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
