import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
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
  const [hasError, sethasError] = useState(false);

  async function fetchMoviesHandler() {
    try {
      setIsLoading(true);
      const res = await fetch("https://swapi.dev/api/films/");
      if (!res.ok) {
        throw new Error("Error in the api");
      }
      const resJson = await res.json();
      const movies = resJson.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        };
      });

      setMovies(movies);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      sethasError(true);
    }
  }

  // fetchMoviesHandler();

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {hasError && <p>hasError</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && !hasError && <MoviesList movies={movies} />}
        {!isLoading && !hasError && movies.length === 0 && (
          <p>No Movies Found</p>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
