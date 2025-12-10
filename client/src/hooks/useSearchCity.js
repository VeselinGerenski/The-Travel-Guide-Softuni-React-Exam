import { useMemo, useState } from "react";

export default function useSearchCity(cities = []) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCities = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return cities;

        return cities.filter((city) => {
            return (
                city.name?.toLowerCase().includes(term) ||
                city.country?.toLowerCase().includes(term)
            );
        });
    }, [cities, searchTerm]);

    const onSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return {
        searchTerm,
        onSearchChange,
        filteredCities,
    };
}
