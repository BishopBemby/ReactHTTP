import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setFetchMovies] = useState([]);

 const fetchMoviesHandler = () =>{
   fetch('https://swapi.dev/api/films/').then((data)=>{
     return data.json();
   }).then((response)=>{
     console.log(response);
     const transformedRes = response.results.map(res=>{
       return {
         id: res.episode_id,
         title: res.title,
         openingText: res.opening_crawl,
         releaseDate: res.release_date
       }
     })
     setFetchMovies(transformedRes);
   })
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
