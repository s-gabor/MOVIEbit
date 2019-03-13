function deleteMovie() {
  let html = this.parentNode;
  let id = html.getAttribute("data-id");
  let movie = new Movie({_id: id });
  movie.deleteMovie().then(
    response => {html.remove()}
    )}
let deleteBtn = document.getElementById("delete_btn");
deleteBtn.addEventListener('click', deleteMovie);

