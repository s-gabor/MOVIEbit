renderNavBar();
const API_ROOT = "https://ancient-caverns-16784.herokuapp.com/";

document.addEventListener('DOMContentLoaded', () => {
    const mode = window.localStorage.getItem('add-edit-mode');

    if (mode === 'edit') {
        fetch(API_ROOT + 'movies/' + window.localStorage.getItem('selectedMovie'))
            .then(response => response.json())
            .then(movie => { // update template with the current movie data
                console.log('edit mode: ', movie);
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
    } else if (mode === 'add') {
        document.getElementById('saveBtn').addEventListener('click', () => {
            const data = {
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
            }
            
            const token = window.localStorage.getItem('authToken');

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

            // fetch('https://ancient-caverns-16784.herokuapp.com/movies', {
            //     method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
            //     body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
            //     headers: new Headers({
            //     'Content-Type': 'application/x-www-form-urlencoded',
            //     'x-auth-token': token
            //     }),
            // })
            // .then(response => response.json())
            // .then(resp => console.log(resp))
        });
    }
})
