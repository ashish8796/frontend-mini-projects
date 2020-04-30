import "./sass/reset.scss";

import "./sass/index.scss";

let photo = document.querySelector(".photo");
let forwardBtn = document.querySelector(".right-button");
let backwardBtn = document.querySelector(".left-button");

let accessKey = "MQ5C-bR-XwJfxJWu5arGKUYGbNp35eojUf1pKyLHGQc";
let unsplashApi = "https://api.unsplash.com/photos/?client_id=";
let search = document.querySelector('.search');

let uri = unsplashApi + accessKey;
let images;
let i = 0;
let max = 0;

fetchUri(uri);

function fetchUri(uri) {
  fetch(uri)
    .then(response => {
      return response.json()
    })
    .then(data => {
      if (Array.isArray(data)) {
        images = data;
      }
      else {
        images = data.results;
        max = data.total_pages;
        pages.setAttribute("max", max)
      }
      insertImage(i);
    });
}

forwardBtn.addEventListener("click", (event) => {
  if (i >= images.length - 1) {
    i = -1;
  }
  i++;
  console.log(`Forward button pushed`)
  insertImage(i)
})

backwardBtn.addEventListener("click", (event) => {
  console.log("Backward button pushed")
  if (i == 0) {
    i = images.length;
  }
  i--;
  insertImage(i)
})

function insertImage(i) {
  console.log(`i: ${i}`)
  let image = images[i].urls.regular + "&h=600";
  photo.innerHTML = `<img src="${image}" />`;
}

let pages = document.querySelector(".page-no");
let page = 1;
pages.addEventListener('change', (event) => {
  i = 0;
  page = pages.value;
  console.log("page:" + page)
  unsplashApi = "https://api.unsplash.com/search/photos/?client_id=";
  uri = unsplashApi + accessKey + `&page=${page}&query=${query.toLowerCase()}}`;
  fetchUri(uri);
})
let query;
search.addEventListener("change", (event) => {
  pages.style.visibility = "visible";
  page = 1; 
  pages.value = page;
  query = search.value;
  i=0;
  console.log("query:" + query)
  unsplashApi = "https://api.unsplash.com/search/photos/?client_id=";
  uri = unsplashApi + accessKey + `&page=${page}&query=${query.toLowerCase()}`;
  fetchUri(uri);
})
