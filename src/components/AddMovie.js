import React, { useRef } from "react";

import classes from "./AddMovie.module.css";

function AddMovie(props) {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  async function submitHandler(event) {
    event.preventDefault();
    try {
      // could add validation here...
      const movie = {
        title: titleRef.current.value,
        openingText: openingTextRef.current.value,
        releaseDate: releaseDateRef.current.value,
      };

      const result = await fetch(
        "https://ingredients-react-willow-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const resJson = await result.json()

      movie['id'] = resJson.name

      props.onAddMovie(movie);
      event.target.reset()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea rows="5" id="opening-text" ref={openingTextRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input type="text" id="date" ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
