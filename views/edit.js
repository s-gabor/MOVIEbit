renderNavBar();
const API_ROOT = "https://ancient-caverns-16784.herokuapp.com/";

document.addEventListener('DOMContentLoaded', () => {
    const mode = window.localStorage.getItem('add-edit-mode');

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
            Plor: document.getElementById('description-input').innerText
        };
    }

    if (mode === 'edit') {
        // populate the template with the selected movie data
        let _id = '';
        fetch(API_ROOT + 'movies/' + window.localStorage.getItem('selectedMovie'))
            .then(response => response.json())
            .then(movie => { // update template with the current movie data
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

                _id = movie._id;
            })
            .catch(err => console.log(err))

        // on saveBtn click update the movie data in api
        document.getElementById('saveBtn').addEventListener('click', () => {
            const token = window.localStorage.getItem('authToken');

            if (token === null) {
                promptInfoMessage('Please Log In to add a new movie!');
            } else {
                const data = getFieldsData();
                $.ajax({
                    url: 'https://ancient-caverns-16784.herokuapp.com/movies/' + _id,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'x-auth-token': token
                    },
                    data: data,
                    success: function(result) {
                        promptInfoMessage(result.Title + ' was updated in database.');
                        const link = document.getElementById('redirectLink');
                        link.addEventListener('click', () => {
                            link.setAttribute('href', './home.html');
                        })
                    }
                });
            }
    })} else if (mode === 'add') {
        document.getElementById('saveBtn').addEventListener('click', () => {
            const token = window.localStorage.getItem('authToken');

            if (token === null) {
                promptInfoMessage('Please Log In to add a new movie!');
            } else {
                const data = getFieldsData();
                $.ajax({
                    url: 'https://ancient-caverns-16784.herokuapp.com/movies',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'x-auth-token': token
                    },
                    data: data,
                    success: function(result) {
                        promptInfoMessage(result.Title + ' was added database.');
                        const link = document.getElementById('redirectLink');
                        link.addEventListener('click', () => {
                            link.setAttribute('href', './home.html');
                        })
                    }
                });
            }
        });
    }
})
