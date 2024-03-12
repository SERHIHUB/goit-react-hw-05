import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesCast } from "../../movies_api";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const [casts, setCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    if (!movieId) return;
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMoviesCast(`movie/${movieId}/credits?`);
        setCasts(data.data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);

  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      {error && toast.error("Ssory, try later please .", { duration: 2000 })}
      <Toaster />
      <ul>
        {casts.map((cast) => {
          return (
            <li key={cast.cast_id}>
              <div className={css.castPic}>
                <img
                  src={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                      : defaultImg
                  }
                  alt="poster"
                />
              </div>
              <p>{cast.name}</p>
              <p>Character: {cast.character}</p>
            </li>
          );
        })}
      </ul>
      {casts.length === 0 && <p>We don`t hawe any casts for this movi.</p>}
    </div>
  );
};

export default MovieCast;
