import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setFetchMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    try{
      const data = await fetch('https://swapi.dev/api/films/');

      //can do with data.status for handling different status codes.
      if(!data.ok){
        throw new Error('Something went wrong');
      }
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
    catch(error){
        setError(error.message);
    }
    setIsLoading(false);
   
 }

 let content = <p>Found No Movies</p>

 if(movies.length>0){
  content = <MoviesList movies={movies} />
 }

 if(error){
  content = <p>{error}</p>;
 }

 if(isLoading){
   content = <p>Loading.....</p>
 }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
