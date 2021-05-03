import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setFetchMovies] = useState([]);

  async function fetchMoviesHandler() {
   const data = await fetch('https://swapi.dev/api/films/');
   const response = await data.json();
   const transformedRes = response.results.map(res=>{
       return {
         id: res.episode_id,
         title: res.title,
         openingText: res.opening_crawl,
         releaseDate: res.release_date
       }
     })
     setFetchMovies(transformedRes);
 }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
