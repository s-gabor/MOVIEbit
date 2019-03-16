// Movies model
function Movies() {
  this.items = [];
}
const apiRoot = "https://ancient-caverns-16784.herokuapp.com/";	
Movies.prototype.getMovies = function() {
  return fetch(apiRoot + "movies")
    .then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((err) => console.log(err))
}

 function getPage(data) {
   var obj = {take: 0, skip: 0, Title: null, Year: null, Genre: null, Type: null, imdbRating: null, imdbID: null};
   var objData;
   $.each(data, function(i, val){
    
    objData = val.split("=");
   
    if (objData[0] == "Title") {
      obj.Title = objData[1];
    }

    if (objData[0] == "skip") {
      obj.skip = objData[1];
    }

    if (objData[0] == "take") {
      obj.take = objData[1];
    }

    if (objData[0] == "Year") {
      obj.Year = objData[1];
    }

    if (objData[0] == "Genre") {
      obj.Genre = objData[1];
    }

    if (objData[0] == "imdbRating") {
      obj.imdbRating = objData[1];
    }

    if (objData[0] == "imdbID") {
      obj.imdbID = objData[1];
    }


   });
   
   ajaxCall(obj);
  
   
 }

 function setPage(parent, html, id, data, isLink = true) {
  

  if (isLink) {
    var page = document.createElement('a');
    page.setAttribute("href", "#currentPage");
    page.setAttribute("onclick", `getPage(${data})`);
    
  } else {
    var page = document.createElement('span');  
  }

  page.innerHTML = html;
  page.setAttribute("id", id);
  parent.append(page); 
 }

 function showPagination(data) {
  var pagination = $(".pagination");

  pagination.children().remove();

  if (data.links.prev) {
    setPage(pagination, "&lt;", "prevPage", getFilters(data.links.prev));
  }

  setPage(pagination, data.currentPage, "currentPage", getFilters(data.links.self), false);


  if (data.links.next) {
    setPage(pagination, "&gt;", "nextPage", getFilters(data.links.next)); 
  }
}

function getFilters(data) {
  return JSON.stringify(data.split("?")[1].split("&"));
}

//  Search and Display Movies functions
function ajaxCall(searchParams) {
  var query = "?";

  $.each(searchParams, function(i, val) {
    if (val) {
      if (i == "Year") {    
        searchParams.Year = val.replace("-", "–");
      }
     
      query += i + "=" + val + "&";
    }
  });
  query =  query.slice(0, -1);
  

  $.ajax({
    url: "https://ancient-caverns-16784.herokuapp.com/movies" + query,
    type: "GET",
    //data: searchParams,
    beforeSend: function() {
      $("body").css('cursor', 'wait');
    },
    success: function (data) {
      document.body.style.cursor = 'context-menu';
      showResults(data.results);
      showPagination(data.pagination);

    },
    error: function (response) {
      alert(response)
    }
  });

  function showResults(data) {

    var movieList1 = $("#movieList");
    movieList1.children().remove();

    $.each(data, function(i, val) {
      const html = document.createElement('a');
      html.setAttribute("class", "movie-item");
      html.setAttribute("data-id", val._id);
      html.setAttribute("href", "./movieDetails.html");
      html.addEventListener("click", () => updateLocalStorage(val._id));
      html.innerHTML =
        `<div class="poster-container">
          <img src=${val.Poster}/>
        </div>
        <p class="movie-title">${val.Title}</p>
        `;
      movieList1.append(html);
    });


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
      template += '</div>';
      template += '</div>';
    }
    results.append(template);
  }

}