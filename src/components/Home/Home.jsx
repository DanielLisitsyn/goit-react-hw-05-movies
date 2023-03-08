import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchTrendingMovies } from 'services/api';
import MovieList from 'components/MovieList/MovieList';
import Loader from 'components/Loader/Loader';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const data = await fetchTrendingMovies();
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
    fetch();
  }, []);

  return (
    <div>
      {loading && <Loader />}
      <MovieList items={movies} />
    </div>
  );
};

export default Home;
