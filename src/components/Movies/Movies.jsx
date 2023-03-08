import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

import MovieList from 'components/MovieList/MovieList';
import Loader from 'components/Loader/Loader';
import Searchbar from 'components/Searchbar/Searchbar';

import { fetchMovieBySearch } from 'services/api';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const data = await fetchMovieBySearch(search);
        if (data.results.length === 0) {
          toast.error('NOTHING FOUND');
          return;
        }
        setMovies(data.results);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (search) {
      fetch();
    }
  }, [search]);

  const onSearchMovies = query => {
    if (query === search) {
      return;
    }
    setSearchParams({ search: query });
    setMovies([]);
  };

  return (
    <div>
      <Searchbar onSubmit={onSearchMovies} />
      {loading && <Loader />}
      <MovieList items={movies} />
    </div>
  );
};

export default Movies;
