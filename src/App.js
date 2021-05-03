import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setFetchMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoviesHandler() {
    setIsLoading(true);
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
     setIsLoading(false);
 }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length===0 && <p>NO Movies Found</p>}
        {isLoading && <p>Loading.......</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
