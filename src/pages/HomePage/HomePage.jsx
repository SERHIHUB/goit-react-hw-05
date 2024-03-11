import { useEffect, useState } from "react";
import { getMovies } from "../../movies_api";
import toast, { Toaster } from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMovies("trending/movie/day?");
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div className={css.container}>
      <h1>Tranding today</h1>
      {error && toast.error("Ssory, try later please .", { duration: 2000 })}
      <Toaster />
      {isLoading && <Loader />}
      <MovieList result={movies} />
    </div>
  );
};

export default HomePage;
