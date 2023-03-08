import { useState, useEffect } from 'react';
import { Link, useParams, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './MovieDetails.module.css';

import { fetchMovieInformation } from 'services/api';

const MovieDetails = () => {
  const [movieInfo, setMovieInfo] = useState([]);

  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    async function fetch() {
      try {
        const data = await fetchMovieInformation(movieId);
        setMovieInfo(data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetch();
  }, [movieId]);

  const { poster_path, title, overview, vote_average, genres = [] } = movieInfo;
  const genreName = genres.map(({ name, id }) => <li key={id}>{name} </li>);

  return (
    <div>
      <div className={css.goBack}>
        <Link to={location.state?.from ?? ''}>Go back</Link>
      </div>
      {movieInfo.length !== 0 && (
        <div>
          <img
            className={css.img}
            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            alt=""
            width={300}
          />
          <h3 className={css.title}>{title}</h3>
          <p className={css.score}>
            User Score: {Math.round(vote_average * 10)}%
          </p>
          <h4 className={css.overviewTitle}>Overview</h4>
          <p className={css.overviewContent}>{overview}</p>
          <h4 className={css.genreTitle}>Genres: </h4>
          <ul className={css.genreContent}>{genreName}</ul>
        </div>
      )}
      <ul className={css.dopInfoList}>
        <li className={css.dopInfoLink}>
          <Link to="cast" state={{ from: location.state?.from ?? '/' }}>
            Cast
          </Link>
        </li>

        <li className={css.dopInfoLink}>
          <Link to="reviews" state={{ from: location.state?.from ?? '/' }}>
            Reviews
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetails;
