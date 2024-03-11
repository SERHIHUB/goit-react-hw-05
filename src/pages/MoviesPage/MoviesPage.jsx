import MovieList from "../../components/MovieList/MovieList";
import toast, { Toaster } from "react-hot-toast";
import css from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { getMoviesByWord } from "../../movies_api";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [params, setParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const movieFilter = params.get("query") ?? "";

  const handleClick = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const { cinema } = form.elements;
    params.set("query", cinema.value);
    setParams(params);

    form.reset();
  };

  useEffect(() => {
    if (movieFilter === "") {
      return;
    }
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMoviesByWord("search/movie?", movieFilter, 1);
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieFilter]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(movieFilter.toLowerCase())
    );
  }, [movieFilter, movies]);

  return (
    <div className={css.container}>
      <div>
        <form className={css.form} onSubmit={handleClick}>
          <input className={css.input} type="text" name="cinema" />
          <button className={css.btn} type="submit">
            Search
          </button>
        </form>
      </div>
      {error && toast.error("Ssory, try later please .", { duration: 2000 })}
      <Toaster />
      {isLoading && <Loader />}
      {movies.length > 0 && <MovieList result={movies} />}
    </div>
  );
};

export default MoviesPage;
