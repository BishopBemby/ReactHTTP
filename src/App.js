import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';

import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setFetchMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  //as funtions are o=js objescts so adding them as depnedency in useEffect will create an infinte loop as technically, this obj iwll re render automatically when it will chnage to itself. solution one: omit dependency from useEffect, solution2: use useCallback()
  const fetchMoviesHandler = useCallback(async ()=>{
    setIsLoading(true);
    setError(null);
    try{
      const data = await fetch('https://reacthttp-f4741-default-rtdb.firebaseio.com/movies.json');

      //can do with data.status for handling different status codes.
      if(!data.ok){
        throw new Error('Something went wrong');
      }
      const response = await data.json();

      const loadedMovies = [];

      for(const key in response){
        loadedMovies.push(
          {
            id: key,
            title: response[key].title,
            openingText: response[key].openingText,
            releaseDate: response[key].releaseDate
          }
        )
      }
      // const transformedRes = response.map(res=>{
      //     return {
      //       id: res.episode_id,
      //       title: res.title,
      //       openingText: res.opening_crawl,
      //       releaseDate: res.release_date
      //     }
      //   })
        setFetchMovies(loadedMovies);
    }
    catch(error){
        setError(error.message);
    }
    setIsLoading(false);
   
 }, [])

 useEffect(()=>{
  fetchMoviesHandler();
},[fetchMoviesHandler]);

async function addMovieHandler(movie) {
  const response = await fetch('https://reacthttp-f4741-default-rtdb.firebaseio.com/movies.json',{
    method: 'POST',
    body: JSON.stringify(movie),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json();
  console.log(data);
  const transformedData = {
    id: data.name,
    title: movie.title,
    openingText: movie.openingText,
    releaseDate: movie.releaseDate
  }
  //to get updated movies list once i submit my own movie
  setFetchMovies((movies) => movies.concat(transformedData));
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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
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
