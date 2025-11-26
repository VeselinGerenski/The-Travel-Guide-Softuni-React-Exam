import { Link } from "react-router";

export default function Home() {
    const cities = [
        {
            id: 1,
            name: "London",
            country: "United Kingdom",
            population: 8900000,
            description:
                "Foggy mornings, red buses and hidden bookshops. A timeless blend of history and modern life.",
            imageUrl: "/images/cities/london.jpg",
            likes: 124,
        },
        {
            id: 2,
            name: "Paris",
            country: "France",
            population: 2148000,
            description:
                "Lantern-lit streets and café terraces along the Seine. The city of light and slow mornings.",
            imageUrl: "/images/cities/paris.jpg",
            likes: 167,
        },
        {
            id: 3,
            name: "Rome",
            country: "Italy",
            population: 2873000,
            description:
                "Warm stone, winding alleys and ancient ruins on every corner. A living postcard from the past.",
            imageUrl: "/images/cities/rome.jpg",
            likes: 142,
        },
    ];

    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-start justify-center gap-10 px-4 pt-40 pb-10 ml-[-40px]">

            {/* LEFT SIDE – WELCOME TEXT */}
            <div className="hidden lg:flex flex-col items-start mt-26 ">
                <h2 className="text-5xl font-['Playfair_Display'] text-white drop-shadow-xl leading-tight">
                    Welcome to<br />The Travel Guide
                </h2>

                <p className="mt-5 text-lg text-white/80 max-w-xs drop-shadow-md">
                    Discover the world’s most beloved cities, curated for modern explorers.
                </p>
            </div>

            {/* RIGHT SIDE – MAIN CONTAINER */}
            <section className="
                w-full max-w-4xl 
                rounded-3xl 
                bg-[#ebe6d9]/85 
                border border-white/40 
                shadow-[0_0_60px_rgba(0,0,0,0.18)] 
                px-10 py-10
            ">
                {/* Header */}
                <div className="mb-5 text-center">
                    <p className="text-xs uppercase tracking-[0.25em] text-amber-700">
                        Created by The Travel Guide
                    </p>
                    <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900 font-['Playfair_Display']">
                        Choose Your Next City
                    </h1>
                    <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
                        Most liked by our travelers
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-7 md:grid-cols-3">
                    {cities.map((city) => (
                        <article key={city.id}>
                            <div className="relative h-75 w-full overflow-hidden rounded-3xl shadow-xl bg-slate-900/10 group">

                                <img
                                    src={city.imageUrl}
                                    alt={city.name}
                                    className="h-full w-full object-cover transform group-hover:scale-120 transition duration-700"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                                <div className="absolute inset-x-0 bottom-0 p-4 text-center text-white pointer-events-none">
                                    <p className="text-[0.65rem] uppercase tracking-[0.25em] text-amber-300">
                                        {city.country}
                                    </p>

                                    <h2 className="mt-1 text-xl font-semibold font-['Playfair_Display']">
                                        {city.name}
                                    </h2>

                                    <p className="mt-1 text-xs text-amber-100/90">
                                        {city.population.toLocaleString()} people · {city.likes} likes
                                    </p>
                                </div>

                                <Link to={`/details/${city.id}`}>
                                    <button
                                        className="
                                            absolute left-1/2 top-1/2 
                                            -translate-x-1/2 -translate-y-1/2
                                            rounded-full bg-white/90 px-4 py-2 
                                            text-xs font-semibold text-slate-900 
                                            shadow-lg opacity-0 group-hover:opacity-100
                                            transition-all duration-500 
                                            hover:bg-amber-600 hover:text-white
                                            pointer-events-auto
                                        "
                                    >
                                        View details
                                    </button>
                                </Link>

                            </div>
                        </article>
                    ))}
                </div>
            </section>

        </div>
    );
}
