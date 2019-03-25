// Add + Edit + Delet buttons
// Display Movies function
document.addEventListener('DOMContentLoaded', onHtmlLoaded);

const updateLocalStorage = (movieId) => {
  window.localStorage.setItem("selectedMovie", movieId);
}

function onHtmlLoaded() {
  renderNavBar();
  let moviesModel = new Movies();
  moviesModel.getMovies()
  .then(function(movies) {
    displayMovies(movies);
  });
  
  document.getElementById('add_btn').addEventListener('click', () => {
    window.localStorage.setItem('add-edit-mode', 'add');
  });

  document.getElementById('regenerate_btn').addEventListener('click', () => {
    const movie = new Movie();
    movie.regenerateDB()
      .then(success => {
        success.forEach(element => {
          if (element.Poster === 'N/A') {
            const movieToEdit = new Movie();
            const defaultPoster = 'https://m.media-amazon.com/images/M/MV5BMTI3NzczMTk5NF5BMl5BanBnXkFtZTcwNDM5NjEzMQ@@._V1_SX300.jpg';
            movieToEdit.editMovie({Poster: defaultPoster}, element._id);
          }
        });
        
        promptInfoMessage('Database was populated!');
        document.getElementById('redirectLink').setAttribute('href', './home.html');
      })
      .catch(error => promptInfoMessage(error))
  });
}

function displayMovies(movies) {
  const container = document.getElementById('movieList');

  $.each(movies.results, function(i, val) {

    const html = document.createElement('a');
    html.setAttribute("class", "movie-item");
    html.setAttribute("data-id", val._id);
    html.setAttribute("href", "./movieDetails.html");
    html.innerHTML = 
      `
        <div class="poster-container">
          <img src=${val.Poster}/>
        </div>
        <p class="movie-title">${val.Title}</p>
      `;
    html.addEventListener("click", () => updateLocalStorage(val._id));
    container.appendChild(html);
  });

  showPagination(movies.pagination);
}

// Search functionality
(function () {

    const searchBtn = $('#searchBtn');

    searchBtn.on('click', function () {
      const searchParams = gatherData();
      ajaxCall(searchParams);
    });

    // Dynamic search on keyup
    const searchList = $('#filtersList');
    searchList.on('keyup', function () {
      const searchParams = gatherData();
      ajaxCall(searchParams);
    });

    function gatherData() {
      const searchParams = {};

      const title = $('#title').val().trim();

      if(title !== ""){
        searchParams.Title = title;
      }

      const yearBox = $('#yearBox');
      const year = $('#year').val().trim();

      if(year !== "" && yearBox.is(":checked")){
        searchParams.Year = year;
      }

      const runtimeBox = $('#runtimeBox');
      const runtime = $('#runtime').val();

      if(runtimeBox.is(":checked") && runtime !== ""){
        searchParams.Runtime = runtime.trim() + ' min';
      }

      const genreBox = $('#genreBox');
      const genre = $('#genre').val();

      if(genreBox.is(":checked") && genre !== ""){
        searchParams.Genre = genre;
      }

      const languageBox = $('#languageBox');
      const language = $('#language').val();

      if(languageBox.is(":checked") && language !== ""){
        searchParams.Language = language;
      }


      const countryBox = $('#countryBox');
      const country = $('#country').val();

      if(countryBox.is(":checked") && country !== "") {
        searchParams.Country = country;
      }

      const posterBox = $('#posterBox');
      const poster = $('#poster').val();

      if(posterBox.is(":checked") && poster !== ""){
        searchParams.Poster = poster;
      }

      const imdbRatingBox = $('#imdbRatingBox');
      const imdbRating = $('#imdbRating').val();

      if(imdbRatingBox.is(":checked") && imdbRating !== ""){
        searchParams.imdbRating = imdbRating;
      }

      const imdbVotesBox = $('#imdbVotesBox');
      const imdbVotes = $('#imdbVotes').val();

      if(imdbVotesBox.is(":checked") && imdbVotes !== ""){
        searchParams.imdbVotes = imdbVotes;
      }

      const imdbIDBox = $('#imdbIDBox');
      const imdbID = $('#imdbID').val();

      if(imdbIDBox.is(":checked") && imdbID !== ""){
        searchParams.imdbID = imdbID;
      }

      const typeBox = $('#typeBox');
      const type = $('#type').val();

      if(typeBox.is(":checked") && type !== ""){
        searchParams.Type = type;
      }

      return searchParams;
    }
})();
