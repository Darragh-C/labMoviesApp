import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getUpcomingMovies } from "../api/tmdb-api";


const UpcomingMoviesPage = (props) => {
  const [movies, setMovies] = useState([]);
  const favourites = movies.filter(m => m.favourite)
  localStorage.setItem('favourites', JSON.stringify(favourites))

  // for (const obj of movies) {
  //   for (const [prop, value] of Object.entries(obj)) {
  //     console.log(`${prop}: ${value}`);
  //   }
  //   console.log('---'); 
  // }

  const addToFavourites = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, favourite: true } : m
    );
    setMovies(updatedMovies);
  };

  useEffect(() => {
    getUpcomingMovies().then(movies => {
      setMovies(movies);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      selectFavourite={addToFavourites}
    />
  );
};
export default UpcomingMoviesPage;