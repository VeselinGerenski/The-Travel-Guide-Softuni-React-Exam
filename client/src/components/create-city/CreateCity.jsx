import { useState } from "react";
import { useNavigate } from "react-router";

const initialValues = {
  name: "",
  country: "",
  population: "",
  imageUrl: "",
  description: "",
}

export default function CreateCity() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues)

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormValues((state) => ({
      ...state,
      [name]: value
    }));
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    
    try {
      await fetch('http://localhost:3030/jsonstore/cities', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      })

      setFormValues(initialValues);

      navigate('/catalog')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-22 pb-10">
      <form onSubmit={SubmitHandler}
        className="w-full max-w-2xl rounded-[32px] bg-[#f3ebdd]/75 backdrop-blur-md border border-amber-900/20 shadow-[0_18px_45px_rgba(0,0,0,0.35)] px-12 py-10 space-y-8"
      >
        {/* Letter header */}
        <div className="flex items-center justify-between border-b border-amber-900/20 pb-3 mb-2 text-[11px] uppercase tracking-[0.25em] text-amber-900/80">
          <span>From: The Travel Guide</span>
          <span>To: City Records Dept.</span>
        </div>

        <h1 className="text-4xl text-center font-['Playfair_Display'] font-semibold text-slate-900">
          Add a New City
        </h1>

        {/* -------------------- ROW 1: Name + Country -------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* City Name */}
          <div>
            <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase text-center">
              City Name
            </label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={changeHandler}
              required
              className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm focus:outline-none focus:border-amber-600 text-center"
              placeholder="e.g. Tokyo"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase text-center">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formValues.country}
              onChange={changeHandler}
              required
              className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm focus:outline-none focus:border-amber-600 text-center"
              placeholder="e.g. Japan"
            />
          </div>
        </div>

        {/* -------------------- ROW 2: Population + Image URL -------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Population */}
          <div>
            <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase text-center">
              Population
            </label>
            <input
              type="number"
              name="population"
              value={formValues.population}
              onChange={changeHandler}
              required
              className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm focus:outline-none focus:border-amber-600 text-center"
              placeholder="e.g. 37400000"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase text-center">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              value={formValues.imageUrl}
              onChange={changeHandler}
              required
              className="w-full border-b border-amber-900/40 bg-transparent py-2 text-sm focus:outline-none focus:border-amber-600 text-center"
              placeholder="Direct link to an image"
            />
          </div>
        </div>

        {/* -------------------- ROW 3: Description (full width) -------------------- */}
        <div>
          <label className="block text-xs font-semibold text-amber-900/90 tracking-[0.15em] uppercase text-center">
            Description
          </label>
          <textarea
            name="description"
            required
            value={formValues.description}
            onChange={changeHandler}
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
          Add City
        </button>
      </form>
    </div>
  );
}
