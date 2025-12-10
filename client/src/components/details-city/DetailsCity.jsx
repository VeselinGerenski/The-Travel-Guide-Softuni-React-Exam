import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import CreateComment from "./comments/CreateComment.jsx";
import DetailsComment from "./comments/DetailsComment.jsx";
import useCityLike from "./city-like/useCityLike.js";
import { useUserContext } from "../../contexts/UserContext.js";
import useRequest from "../../hooks/useRequest.js";
import Spinner from "../spinner/Spinner.jsx";
import useValidation from "../../hooks/useValidation.js";
import useDeleteCity from "../../hooks/useDeleteCity.js";
import CityActionsBar from "./details-city-info/CityActionsBar.jsx";
import CityInfoBlock from "./details-city-info/CityInfoBlock.jsx";

export default function DetailsCity({ heightClass = "h-58" }) {
  const { user, isAuthenticated } = useUserContext();
  const navigate = useNavigate();
  const { request } = useRequest();
  const { cityId } = useParams();

  const [city, setCity] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { errors, setErrors } = useValidation();
  const { deleteCity } = useDeleteCity(request, navigate, setErrors);
  const { likes, userHasLiked, toggleLike } = useCityLike(cityId, city?._ownerId);

  useEffect(() => {
    request(`/data/cities/${cityId}`)
      .then(result => {
        setCity(result);
      })
      .catch(err => {
        alert(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [cityId, request]);

  const refreshHandler = () => {
    setRefresh(state => !state);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center px-3 py-3 z-50"
      onClick={() => navigate(-1)}
    >
      <section
        className="
          w-full max-w-2xl
          rounded-3xl                
          bg-[#f3ebdd]/95 
          border border-amber-900/20 
          shadow-[0_18px_45px_rgba(0,0,0,0.35)]
          overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >

        {isLoading ? <div className="min-h-screen flex items-center justify-center text-slate-700"><Spinner /></div>
          :
          <>
            {/* IMAGE + BASIC INFO */}
            <CityInfoBlock
              city={city}
              heightClass={heightClass}
              onClose={() => navigate(-1)}
            />

            {/* ACTIONS + COMMENTS */}
            <CityActionsBar
              cityId={cityId}
              cityName={city.name}
              likes={likes}
              userHasLiked={userHasLiked}
              isAuthenticated={isAuthenticated}
              toggleLike={toggleLike}
              deleteCity={deleteCity}
              errors={errors}
            />

            <div className="px-6 pb-4 pt-2 border-t border-amber-900/20">
              <h2 className="text-sm font-semibold text-slate-900 mb-1">
                Comments
              </h2>

              <div className="max-h-[300px] overflow-y-auto flex flex-col gap-2">
                <DetailsComment
                  cityId={cityId}
                  refresh={refresh}
                  refreshHandler={refreshHandler}
                />
              </div>

              {isAuthenticated && (
                <CreateComment
                  user={user}
                  cityId={cityId}
                  onCreate={refreshHandler}
                />
              )}
            </div>
          </>
        }
      </section>
    </div>
  );
}
