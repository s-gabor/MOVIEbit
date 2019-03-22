const DELETE_CONFIRMATION_TRUE = 'Movie deleted!';
const DELETE_CONFIRMATION_FALSE = 'You\'re not authorized to delete movies.<br><br>Please Log In first.';
const API_ROOT = "https://ancient-caverns-16784.herokuapp.com/";


function deleteMovie() {
  const html = this.parentNode; // ES6 "this" has different meaning => const html = document.querySelector('.details-btns');
  const id = window.localStorage.getItem('selectedMovie');

  const movie = new Movie({_id: id });
  movie.deleteMovie()
    .then(response => {
      if (response.ok) {
        promptInfoMessage(DELETE_CONFIRMATION_TRUE); // log in on movieDetails(not on home) => not authorized to delete movies! WHY ???
        html.remove(); // WHY do we need to remove this (edit/delete buttons) ???
      } else {
        promptInfoMessage(DELETE_CONFIRMATION_FALSE);
      }
      document.getElementById('redirectLink').setAttribute('href', './home.html');
    })
    .catch(err => promptInfoMessage(err))
}

const editMovie = () => {
  window.localStorage.setItem('add-edit-mode', 'edit');
}

const editBtn = document.getElementById('edit_btn');
const deleteBtn = document.getElementById('delete_btn');

if (deleteBtn || editBtn) { // check if movieDetails.html has loaded
  deleteBtn.addEventListener('click', deleteMovie);
  editBtn.addEventListener('click', editMovie);
}

document.addEventListener('DOMContentLoaded', () => {
  renderNavBar(); 

  const movieId = window.localStorage.getItem('selectedMovie');

  fetch(API_ROOT + 'movies/' + movieId)
    .then(response => response.json())
    .then(movie => { // update template with the current movie data
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
