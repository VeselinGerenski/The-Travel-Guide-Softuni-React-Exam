export function getProfileStats({ likes = [], cities = [], comments = [], userId }) {

    if (!userId) {
        return {
            likesGiven: [],
            myCities: [],
            likesReceived: [],
            likedCities: [],
            recentComments: [],
        };
    };
    
    // Likes given by this user
    const likesGiven = likes.filter(l => l._ownerId === userId);

    // Cities created by this user
    const myCities = cities.filter(c => c._ownerId === userId);

    // Likes received on my cities
    const myCityIds = new Set(myCities.map(c => c._id));
    const likesReceived = likes.filter(l => myCityIds.has(l.cityId));

    // Liked cities list (from likesGiven)
    const likedCityIds = Array.from(new Set(likesGiven.map(l => l.cityId)));
    const likedCities = cities.filter(c => likedCityIds.includes(c._id));

    // Recent comments (sort by createdOn desc)
    const recentComments = [...comments]
        .sort((a, b) => b._createdOn - a._createdOn)
        .slice(0, 5);

    return {
        likesGiven,
        myCities,
        likesReceived,
        likedCities,
        recentComments,
    };
}
