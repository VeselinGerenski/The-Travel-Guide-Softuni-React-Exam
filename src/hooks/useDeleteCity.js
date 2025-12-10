import { useCallback } from "react";

export default function useDeleteCity(request, navigate, setErrors) {
  const deleteCity = useCallback(
    
    async (cityId, cityName) => {
      const isConfirmed = confirm(`Are you sure you want to delete ${cityName}?`);

      if (!isConfirmed) {
        return;
      }

      try {
        await request(`/data/cities/${cityId}`, "DELETE");
        navigate(-1);
      } catch (err) {
        if (err.status === 403 || err.message.includes("Forbidden")) {
          setErrors((state) => ({
            ...state,
            global: "You can only delete cities you added.",
          }));
          return;
        }

        alert(err.message);
      }
    },
    [request, navigate, setErrors]
  );

  return { deleteCity };
}
