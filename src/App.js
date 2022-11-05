import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
//for icon
import SearchIcon from "./search.svg";
//for styling
import "./App.css";

//calling api to get all the data about movies
//I've used omdb api key for generating a api key
const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=359cfe77";
//to fetch data from the api as soon as our component loads i'm using useeffect hook
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  //func to fetch our movies
  //async is for asynchroneous data that means it'll take sometime to fetch the movies
  const searchMovies = async (title) => {
    //to call api
    const result = await fetch(`${API_URL}&s=${title}`);
    //to get data from it
    const data = await result.json();
    //to populate movies in our search
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found!!</h2>
        </div>
      )}
    </div>
  );
};

export default App;
