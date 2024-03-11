import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesReviews } from "../../movies_api";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieId) return;
    async function getData() {
      try {
        const data = await getMoviesReviews(`movie/${movieId}/reviews?`);
        setReviews(data);
      } catch (error) {}
    }
    getData();
  }, [movieId]);
  return (
    <div>
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
