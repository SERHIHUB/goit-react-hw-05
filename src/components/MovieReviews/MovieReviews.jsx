import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesReviews } from "../../movies_api";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMoviesReviews(`movie/${movieId}/reviews?`);
        setReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);
  return (
    <div>
      {isLoading && <Loader />}
      {error && toast.error("Ssory, try later please .", { duration: 2000 })}
      <Toaster />
      <ul>
        {reviews.map((review) => {
          return (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          );
        })}
      </ul>
      {reviews.length === 0 && <p>We don`t hawe any reviews for this movi.</p>}
    </div>
  );
};

export default MovieReviews;
