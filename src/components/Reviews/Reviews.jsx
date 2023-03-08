import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from 'services/api';
import { toast } from 'react-toastify';
import css from './Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const params = useParams();

  useEffect(() => {
    async function fetch() {
      try {
        const data = await fetchMovieReviews(params.movieId);
        if (data.results.length === 0) {
          toast.error('REVIEWS INFO NOT FOUND');
          return;
        }
        setReviews(data.results);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetch();
  }, [params.movieId]);

  let reviewMarkup = [];
  if (reviews.length !== 0) {
    reviewMarkup = reviews.map(({ author, content, id }) => (
      <li className={css.reviewItem} key={id}>
        <h5 className={css.reviewAuthor}>{author}</h5>
        <p>{content}</p>
      </li>
    ));
  }

  return (
    <div>
      <ul>{reviewMarkup}</ul>
    </div>
  );
};

export default Reviews;
