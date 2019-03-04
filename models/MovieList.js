// Movies model
function Movies() {
  this.items = [];
}
const apiRoot = "https://ancient-caverns-16784.herokuapp.com/";	
Movies.prototype.getMovies = function() {
  return fetch(apiRoot + "movies")
    .then((response) => response.json())
    .then((responseJson) => responseJson.results)
    .catch((err) => console.log(err))
}

 // Movie model
 function Movie(options = {}) {
   this._id = options._id;
   this.Title = options.Title;
   this.Year = options.Year;
   this.Poster = options.Poster;
   this.Genre = options.Genre;
   this.Type = options.Type;
   this.imdbRating = options.imdbRating;
   this.imdbID = options.imdbID
 }
