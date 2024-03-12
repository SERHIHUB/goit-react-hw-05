import { Suspense, useEffect, useState } from "react";
import { useParams, NavLink, Outlet, useSearchParams } from "react-router-dom";
import { getMoviesById } from "../../movies_api";
import css from "./MovieDetailsPage.module.css";
import toast, { Toaster } from "react-hot-toast";
import GoBack from "../../components/GoBack/GoBack";
import Loader from "../../components/Loader/Loader";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);
  const [movieDate, setmovieDate] = useState("");
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMoviesById(`movie/${movieId}?`);
        setMovie(data);
        setGenres(data.genres);
        setmovieDate(movie.release_date);
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
      <GoBack />
      {error && toast.error("Ssory, try later please .", { duration: 2000 })}
      <Toaster />
      {isLoading && <Loader />}
      <div className={css.infoContainer}>
        <div className={css.picContainer}>
          <img
            className={css.pic}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : defaultImg
            }
            alt="poster"
          />
        </div>
        <div>
          <h2>
            {movie.title}({movie.release_date})
          </h2>
          <p>User score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul className={css.genresList}>
            {genres.map((genre) => {
              return <li key={genre.id}>{genre.name}</li>;
            })}
          </ul>
        </div>
      </div>
      <hr className={css.line} />
      <div>
        <p>Additional information</p>
      </div>
      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <hr className={css.line} />
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
