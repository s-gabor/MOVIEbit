const API_ROOT = "https://ancient-caverns-16784.herokuapp.com/";


function deleteMovie() {
  // const html = this.parentNode; // ES6 "this" has different meaning => const html = document.querySelector('.details-btns');
  const _id = window.localStorage.getItem('selectedMovie');

  const movie = new Movie();
  movie.deleteMovie(_id)
    .then(success => {
      promptInfoMessage(success);
      document.getElementById('redirectLink').setAttribute('href', './home.html');
    })
    .catch(error => promptInfoMessage(error.responseJSON.message))
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
