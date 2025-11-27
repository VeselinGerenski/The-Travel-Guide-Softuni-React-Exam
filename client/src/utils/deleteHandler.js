
const deleteHandler = async (city, cityId, navigate) => {
    const isConfirmed = confirm(`Are you sure you want to delete ${city.name}?`);

    if (!isConfirmed) {
        return;
    }
    try {
        const response = await fetch(`http://localhost:3030/jsonstore/cities/${cityId}`, {
            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error('Failed to delete city.');
        }

        navigate(-1)
    } catch (err) {
        alert(err.message)
    }
}
export default deleteHandler;