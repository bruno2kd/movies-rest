import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

// const dummyMovies = [
//   {
//     id: 2,
//     title: "Some Dummy Movie 2",
//     openingText: "This is the second opening text of the movie",
//     releaseDate: "2021-05-19",
//   },
// ];

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMoviesHandler = useCallback(async () => {
    try {
      console.log("api fetchMoviesHandler acionada");
      setIsLoading(true);
      setErrorMessage("");
      const res = await fetch(
        "https://ingredients-react-willow-default-rtdb.firebaseio.com/movies.json"
        // "https://swapi.dev/api/films/"
      );
      if (!res.ok) {
        throw new Error("Error in the api");
      }
      const resJson = await res.json();
      console.log("resJson");
      console.log(resJson);

      const moviesList = [];

      for (const key in resJson) {
        moviesList.push({
          id: key,
          title: resJson[key].title,
          openingText: resJson[key].openingText,
          releaseDate: resJson[key].releaseDate,
        });
      }

      setMovies(moviesList);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log("hook useEffect");

    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const onAddMovie = (movie) => {
    setMovies(movies.concat(movie));
  };

  let htmlBody = <p>No Movies Found</p>;

  if (isLoading) {
    htmlBody = <p>Loading...</p>;
  } else if (!isLoading && !errorMessage) {
    htmlBody = <MoviesList movies={movies} />;
  } else if (!isLoading && !errorMessage && movies.length === 0) {
    htmlBody = <p>No Movies Found</p>;
  } else if (!isLoading && errorMessage) {
    htmlBody = <p>{errorMessage}</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={onAddMovie} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{htmlBody}</section>
    </React.Fragment>
  );
}

export default App;
