
export default function EditCity() {

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-22 pb-10">
      <form
       
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
