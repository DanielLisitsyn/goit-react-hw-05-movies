import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCastInformation } from 'services/api';
import css from './Cast.module.css';
import { toast } from 'react-toastify';

const Cast = () => {
  const [actors, setActors] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    async function fetch() {
      try {
        const data = await fetchMovieCastInformation(movieId);
        if (data.cast.length === 0) {
          toast.error('CAST INFO NOT FOUND');
          return;
        }
        setActors(data.cast);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetch();
  }, [movieId]);

  let actorsMarkup = [];
  if (actors.length !== 0) {
    actorsMarkup = actors.map(
      ({ original_name, character, profile_path, cast_id }) => {
        const imgUrl = profile_path
          ? `https://image.tmdb.org/t/p/original/${profile_path}`
          : 'https://pusat.edu.np/wp-content/uploads/2022/09/default-image.jpg';
        return (
          <li className={css.castActor} key={cast_id}>
            <img className={css.castActorPhoto} src={imgUrl} alt="" />
            <p className={css.castActorName}>{original_name}</p>
            <p className={css.castActorCharacter}>{character}</p>
          </li>
        );
      }
    );
  }

  return (
    <div className="container">
      <ul className={css.castList}>{actorsMarkup}</ul>
    </div>
  );
};

export default Cast;
