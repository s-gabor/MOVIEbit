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


//  Search and Display Movies functions
function ajaxCall(searchParams) {
    
  $.ajax({
    url: "https://ancient-caverns-16784.herokuapp.com/movies",
    type: "GET",
    data: searchParams,
    beforeSend: function() {
      $("body").css('cursor', 'wait');
    },
    success: function (data) {
      console.log(data);
      document.body.style.cursor = 'context-menu';
      showResults(data.results);
    },
    error: function (response) {
      alert(response)
    }
  });

}