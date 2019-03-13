// Movie model
function Movie(options = {}) {
  this._id = options._id;
  this.Title = options.Title;
  this.Year = options.Year;
  this.Poster = options.Poster;
  this.Genre = options.Genre;
  this.Type = options.Type;
  this.imdbRating = options.imdbRating;
  this.imdbID = options.imdbID;
}

const myHeaders = new Headers({
  'Content-Type': 'application/json',
  'x-auth-token': localStorage.getItem("authToken")
})

Movie.prototype.deleteMovie = function () {
  
  return fetch(apiRoot + "movies/" + this._id,
  {
    headers: myHeaders,
    method: "DELETE"
  })
  .then(response => response)
}