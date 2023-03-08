import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ items }) => {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {items.map(item => {
        const imgUrl = item.poster_path
          ? `https://image.tmdb.org/t/p/original/${item.poster_path}`
          : 'https://pusat.edu.np/wp-content/uploads/2022/09/default-image.jpg';
        return (
          <Link
            to={`/movies/${item.id}`}
            key={item.id}
            state={{ from: location }}
          >
            <li className={css.movieItem}>
              <img
                className={css.movieItemImage}
                src={imgUrl}
                alt=""
                width={250}
              />
              <p className={css.movieItemTitle}>{item.title}</p>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default MovieList;
MovieList.propTypes = {
  items: PropTypes.array,
};
