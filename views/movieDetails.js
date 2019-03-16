function deleteMovie() {
  console.log('delete clicked!');
  const html = this.parentNode;
  const id = window.localStorage.getItem('selectedMovie');
  const movie = new Movie({_id: id });
  movie.deleteMovie()
    .then(response => {
      alert('Movie deleted!', response); // TODO: display proper delete confirmation
      html.remove();
    })
    .catch(err => console.log(err))
}

// const deleteMovie = () => { // in ES6 "this" has different meaning --> will point to window object
//   console.log('delete clicked!');
//   const html = document.querySelector('.details-btns');
//   const id = window.localStorage.getItem('selectedMovie');
//   const movie = new Movie({_id: id });
//   movie.deleteMovie()
//     .then(response => {
//       console.log(response);
//       html.remove();
//     })
//     .catch(err => console.log(err))
// }

const editMovie = () => {
  console.log('edit clicked!');
}

const deleteBtn = document.getElementById('delete_btn');
const editBtn = document.getElementById('edit_btn');

if (deleteBtn || editBtn) { // check if movieDetails.html has loaded
  deleteBtn.addEventListener('click', deleteMovie);
  editBtn.addEventListener('click', editMovie);
}

document.addEventListener('DOMContentLoaded', () => {
  const movieId = window.localStorage.getItem('selectedMovie');
  const apiRoot = "https://ancient-caverns-16784.herokuapp.com/";
  // fetch movie details for the selected movie
  fetch(apiRoot + 'movies/' + movieId)
    .then(response => response.json())
    .then(movie => {
      // update template with the current movie data
      document.getElementById('selectedMoviePoster').setAttribute('src', movie.Poster);
      document.getElementById('selectedMovieTitle').innerHTML = movie.Title;
      document.getElementById('selectedMovieYear').innerHTML = movie.Year;
      document.getElementById('selectedMovieGenre').innerHTML = movie.Genre;
      document.getElementById('selectedMovieRuntime').innerHTML = movie.Runtime;
      document.getElementById('selectedMovieDescription').innerHTML = movie.Plot;
      document.getElementById('selectedMovieType').innerHTML = movie.Type;
      document.getElementById('selectedMovieImdbID').innerHTML = movie.imdbID;
      document.getElementById('selectedMovieLanguage').innerHTML = movie.Language;
      document.getElementById('selectedMovieCountry').innerHTML = movie.Country;
      document.getElementById('selectedMovieRating').innerHTML = movie.imdbRating;
      document.getElementById('selectedMovieVotes').innerHTML = movie.imdbVotes;
    })
  
  
});
