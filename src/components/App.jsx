import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import headerMenuItems from '../data/headerMenuItems.json';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader/Loader';

const Header = lazy(() => import('./Header/Header'));
const Home = lazy(() => import('./Home/Home'));
const Movies = lazy(() => import('./Movies/Movies'));
const MovieDetails = lazy(() => import('./MovieDetails/MovieDetails'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));
const NotFoundPage = lazy(() => import('./NotFoundPage/NotFoundPage'));

export const App = () => {
  return (
    <div>
      <Header menuItems={headerMenuItems} />
      <ToastContainer autoClose={3000} theme="colored" position="top-right" />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};
