renderNavBar();

const getFieldsData = () => {
    return {
        Title: document.getElementById('title-input').value,
        Year: document.getElementById('year-input').value,
        Runtime: document.getElementById('runtime-input').value,
        Genre: document.getElementById('genre-input').value,
        Country: document.getElementById('country-input').value,
        Language: document.getElementById('language-input').value,
        imdbRating: document.getElementById('imdbRating-input').value,
        imdbVotes: document.getElementById('imdbVotes-input').value,
        imdbID: document.getElementById('imdbId-input').value,
        Type: document.getElementById('type-input').value,
        Poster: document.getElementById('uploadPoster-input').value,
        Plot: document.getElementById('description-input').innerText
    };
}

const populateFieldsData = movieId => {
    const movie = new Movie();

    movie.getMovie(movieId)
        .then(movie => {
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
        .catch(error => promptInfoMessage(error.responseJSON.message))
}

const mode = window.localStorage.getItem('add-edit-mode');

const successfulRequest = (success, mode) => {
    promptInfoMessage(`${success.Title} <br> was sccessfuly ${mode}ed!`);
    document.getElementById('redirectLink').setAttribute('href', './home.html');
}

const addEditHeading = document.getElementById('add-edit-heading');

if (mode === 'edit') {
    addEditHeading.innerText = 'Edit movie';
    
    const movieId = window.localStorage.getItem('selectedMovie');

    populateFieldsData(movieId);

    document.getElementById('saveBtn').addEventListener('click', () => {
        const movie = new Movie();
        const dataObj = getFieldsData();

        movie.editMovie(dataObj, movieId)
            .then(success => successfulRequest(success, mode))
            .catch(error => promptInfoMessage(error.responseJSON.message))
    })
} else if (mode === 'add') {
    addEditHeading.innerText = 'Add new movie';

    document.getElementById('saveBtn').addEventListener('click', () => {
        const movie = new Movie();
        const dataObj = getFieldsData();

        movie.addMovie(dataObj)
            .then(success => successfulRequest(success, mode))
            .catch(error => promptInfoMessage(error.responseJSON.message))
    });
}
