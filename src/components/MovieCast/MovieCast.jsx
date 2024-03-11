import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesCast } from "../../movies_api";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const [casts, setCasts] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    async function getData() {
      try {
        const data = await getMoviesCast(`movie/${movieId}/credits?`);
        setCasts(data.data.cast);
      } catch (error) {}
    }
    getData();
  }, [movieId]);

  return (
    <div className={css.container}>
      <ul>
        {casts.map((cast) => {
          return (
            <li key={cast.cast_id}>
              <div className={css.castPic}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                  alt="poster"
                />
              </div>
              <p>{cast.name}</p>
              <p>Character: {cast.character}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieCast;
