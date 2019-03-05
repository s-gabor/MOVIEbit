const burgerMenu = document.querySelector(".burger-menu");
const navBar = document.querySelector(".navigation");
const burgerLine = document.querySelector(".burger-line");

burgerMenu.addEventListener("click", function() {    
    if(navBar.classList.contains("burger-menu-open")) {
        navBar.classList.remove("burger-menu-open");
        this.classList.remove("open");
    } else {
        navBar.classList.add("burger-menu-open");
        this.classList.add("open");
    }
});

var sliderImages = document.querySelectorAll(".slide"),
    arrowLeft = document.querySelector("#chevron_left"),
    arrowRight = document.querySelector("#chevron_right"),
    slidesNumber = sliderImages.length,
    current = 0;
    
function reset() {
    for(let i = 0; i < slidesNumber; i++) {
        sliderImages[i].style.display = "none";
    }
}

function startSlide() {
    reset();
    sliderImages[0].style.display = "block";
}

function slideLeft() {
    reset();
    sliderImages[current - 1].style.display = "block";
    sliderImages[current - 1].classList.add('fade-in');
    setTimeout(() => sliderImages[current].classList.remove('fade-in'),500);
    current--;
}

function slideRight() {
    reset();
    sliderImages[current + 1].style.display = "block";
    sliderImages[current + 1].classList.add('fade-in');
    setTimeout(() => sliderImages[current].classList.remove('fade-in'),500);
    current++;
}

arrowLeft.addEventListener("click", function() {
    if(current === 0){
        current = slidesNumber;
    }
    slideLeft();
});

arrowRight.addEventListener("click", function() {
    if(current === slidesNumber - 1){
        current = -1;
    }
    slideRight();
});

startSlide();

// Add + Edit + Delet buttons
// Display Movies function
document.addEventListener('DOMContentLoaded', onHtmlLoaded);

function onHtmlLoaded() {
  let moviesModel = new Movies();
  moviesModel.getMovies()
  .then(function(movies) {
    displayMovies(movies);
  });
}
function displayMovies(movies) {
  const container = document.getElementById('movieList');
  for(let i = 0; i < movies.length; i++) {
    let id = movies[i]._id;
    let title = movies[i].Title;
    let year = movies[i].Year;
    let poster = movies[i].Poster;
    let genre = movies[i].Genre;
    let type = movies[i].Type;
    let imdbRating = movies[i].imdbRating;
    let imdbID = movies[i].imdbID;
    const html = document.createElement('article');
    html.setAttribute("data-id", id);
    html.innerHTML = `
      <img src=${poster}/>
      <h3>${title}</h3>
      <h5>Genre: ${genre}</h5>
      <p>Type: ${type} from year ${year}</p>
      <p>Imdb Rating: ${imdbRating}</p>
      <button class='delete'>Delete Movie</button>
      <button class='edit'>Edit Movie</button>
    `
  container.appendChild(html);
  }
}


// Search functionality
(function () {

    var searchBtn = $('#searchBtn');
  
    searchBtn.on('click', function () {
      var searchParams = gatherData();
      ajaxCall(searchParams);
    })
  
    function gatherData() {
      var searchParams = {};
  
      var title = $('#title').val().trim();
  
      if(title != ""){
        searchParams.Title = title;
      }
  
      var yearBox = $('#yearBox');
      var year = $('#year').val().trim();
  
      if(year != "" && yearBox.is(":checked")){
        searchParams.Year = year;
      }
  
      var runtimeBox = $('#runtimeBox');
      var runtime = $('#runtime').val();
  
      if(runtimeBox.is(":checked") && runtime != ""){
        searchParams.Runtime = runtime.trim() + ' min';
      }
  
      var genreBox = $('#genreBox');
      var genre = $('#genre').val();
  
      if(genreBox.is(":checked") && genre != ""){
        searchParams.Genre = genre;
      }
  
      var languageBox = $('#languageBox');
      var language = $('#language').val();
  
      if(languageBox.is(":checked") && language != ""){
        searchParams.Language = language;
      }
  
  
      var countryBox = $('#countryBox');
      var country = $('#country').val();
  
      if(countryBox.is(":checked") && country != "") {
        searchParams.Country = country;
      }
  
      var posterBox = $('#posterBox');
      var poster = $('#poster').val();
  
      if(posterBox.is(":checked") && poster != ""){
        searchParams.Poster = poster;
      }
  
      var imdbRatingBox = $('#imdbRatingBox');
      var imdbRating = $('#imdbRating').val();
  
      if(imdbRatingBox.is(":checked") && imdbRating != ""){
        searchParams.imdbRating = imdbRating;
      }
  
      var imdbVotesBox = $('#imdbVotesBox');
      var imdbVotes = $('#imdbVotes').val();
    
      if(imdbVotesBox.is(":checked") && imdbVotes != ""){
        searchParams.imdbVotes = imdbVotes;
      }
  
      var imdbIDBox = $('#imdbIDBox');
      var imdbID = $('#imdbID').val();
  
      if(imdbIDBox.is(":checked") && imdbID != ""){
        searchParams.imdbID = imdbID;
      }
  
      var typeBox = $('#typeBox');
      var type = $('#type').val();
  
      if(typeBox.is(":checked") && type != ""){
        searchParams.Type = type;
      }
      return searchParams;
    }
  
    function showResults(data) {
      var results = $('#results');
      var template = '';
      results.empty();
      for (let i = 0; i < data.length; i++) {
        const el = data[i];
        template += '<div class="column">';
        template += '<div class="content">';
        template +='<picture><img src="'+ el.Poster +'" style="width:auto; alt='+ el.Title +'"></picture>';
        template +='<h4 style="width:250px;">'+ el.Title + '</h4>';
        template += '<p>' + el.Genre +'</p>';
        template += '<p>' + el.Language +'</p>';
        template += '<p>' + el.Country +'</p>';
       // template += '<p>' + el.Poster +'</p>';
        template += '</div>';
        template += '</div>';
      }
      results.append(template);
    }
  })();