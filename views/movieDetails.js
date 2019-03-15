function deleteMovie() {
  console.log('delete clicked!');
  const html = this.parentNode;
  const id = html.getAttribute("data-id");
  const movie = new Movie({_id: id });
  movie.deleteMovie()
    .then(response => {
      // TODO: display delete confirmation
      console.log('Movie deleted! ', response);
      html.remove();
    })
    .catch(err => console.log(err))
}

// const deleteMovie = () => { // in ES6 "this" has different meaning --> will point to window object
//   console.log('delete clicked!');
//   const html = document.querySelector('.details-btns');
//   const id = html.getAttribute("data-id");
//   const movie = new Movie({_id: id });
//   movie.deleteMovie()
//     .then(response => {
//       console.log(response);
//       html.remove();
//     })
//     .catch(err => console.log(err))
// }

const editMovie = () => {
  console.log('edit clicked!');
}

const deleteBtn = document.getElementById("delete_btn");
deleteBtn.addEventListener('click', deleteMovie);

const editBtn = document.getElementById("edit_btn");
editBtn.addEventListener('click', editMovie);

