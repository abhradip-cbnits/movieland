import React, {useState, useEffect} from 'react';
import './App.css';
import searchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = "https://www.omdbapi.com?apikey=eb15a133";

const App = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data, "--");
    setMovieList(data.Search);
  }

  useEffect(() => {
    searchMovies('spiderman');
  },[]);



  return(
    <div className='app'>
      <h1>MovieLand</h1>

      <div className='search'>
        <input 
          value={searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value)} 
        />
        

        <img 
          src={searchIcon}
          alt="Search"
          onClick={()=> searchMovies(searchTerm)}
        />
      </div>


      {
        movieList?.length > 0 ?
        (
          <div className='container'>
            {movieList.map((movie) => (
            <MovieCard movie={movie} />
          ))}
          </div>
        ):
        (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      }
    </div>
  )
}

export default App;
