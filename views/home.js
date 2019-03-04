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
    setTimeout(() => sliderImages[current - 1].classList.remove('fade-in'),500);
    current--;
}

function slideRight() {
    reset();
    sliderImages[current + 1].style.display = "block";
    sliderImages[current + 1].classList.add('fade-in');
    setTimeout(() => sliderImages[current + 1].classList.remove('fade-in'),500);
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


