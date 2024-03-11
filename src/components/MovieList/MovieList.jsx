import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const MovieList = ({ result }) => {
  const location = useLocation();
  return (
    <div>
      <ul>
        {result.map((movie) => {
          return (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={location}>
                {movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieList;
