import { useEffect, useState } from "react";
import CityCard from "../city-card/CityCard.jsx";

export default function Home() {
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('http://localhost:3030/jsonstore/cities')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Unable to load cities");
                }
                return response.json()
            })
            .then(result => {
                setCities(Object.values(result))
            })
            .catch(err => {
                alert(err.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])


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
                {isLoading ?
                    <p className="text-center text-slate-700">Loading...</p>
                    : (
                        <div className="grid gap-7 md:grid-cols-3">
                            {cities
                                .sort((a, b) => b.likes - a.likes)
                                .slice(0, 3)
                                .map(city => (
                                    <CityCard
                                        key={city._id}
                                        {...city}
                                        heightClass="h-72"
                                    />
                                ))}
                        </div>
                    )};

                {cities.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                            Oops! No Cities Found
                        </h2>
                        <p className="text-lg text-amber-700 mb-2">
                            It looks like we don't have any cities to show right now.
                        </p>
                    </div>)}

            </section>

        </div>
    );
}
