const API_ROOT_MOVIES = 'https://ancient-caverns-16784.herokuapp.com/movies/';

// Movie model
function Movie(options = {}) {
  this._id = options._id;
  this.Title = options.Title;
  this.Year = options.Year;
  this.Runtime = options.Runtime;
  this.Genre = options.Genre;
  this.country = options.Country;
  this.Language = options.Language;
  this.imdbRating = options.imdbRating;
  this.imdbVotes = options.imdbVotes;
  this.imdbID = options.imdbID;
  this.Type = options.Type;
  this.Poster = options.Poster;
  this.Plot = options.Plot;
}

const getHeaders = () => {
  return {
    'Content-Type': 'application/x-www-form-urlencoded',
    'x-auth-token': window.localStorage.getItem('authToken')
  };
}

Movie.prototype.getMovie = function (_id) {
  return $.ajax({
    url: API_ROOT_MOVIES + _id,
    method: 'GET',
    headers: getHeaders()
  });
}

Movie.prototype.deleteMovie = function (_id) {
  return $.ajax({
    url: API_ROOT_MOVIES + _id,
    method: 'DELETE',
    headers: getHeaders()
  });
}

Movie.prototype.addMovie = function (data) {
  return $.ajax({
    url: API_ROOT_MOVIES,
    method: 'POST',
    headers: getHeaders(),
    data: data
  });
}

Movie.prototype.editMovie = function (data, id) {
  return $.ajax({
    url: API_ROOT_MOVIES + id,
    method: 'PUT',
    headers: getHeaders(),
    data: data
  });
}
