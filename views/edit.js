const API_ROOT = "https://ancient-caverns-16784.herokuapp.com/";

fetch(API_ROOT + 'movies/' + window.localStorage.getItem('selectedMovie'))
    .then(response => response.json())
    .then(movie => { // update template with the current movie data
        console.log(movie);
        document.getElementById('title-input').value = movie.Title;
        document.getElementById('year-input').value = movie.Year;
        document.getElementById('runtime-input').value = movie.Runtime;
        document.getElementById('genre-input').value = movie.Genre;
        document.getElementById('country-input').value = movie.Country;
        document.getElementById('language-input').value = movie.Language;
        document.getElementById('imdbRating-input').value = movie.imdbRating;
        document.getElementById('imdbVotes-input').value = movie.imdbVotes;
        document.getElementById('imdbId-input').value = movie.imdbID;
        document.getElementById('type-input').value = movie.Type;
        document.getElementById('uploadPoster-input').value = movie.Poster;
        document.getElementById('description-input').innerHTML = movie.Plot;
    })
    .catch(err => console.log(err))