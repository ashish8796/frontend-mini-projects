import "./sass/reset.scss";

import "./sass/index.scss";

let photo = document.querySelector(".photo");
let forwardBtn = document.querySelector(".right-button");
let backwardBtn = document.querySelector(".left-button");

let accessKey = "MQ5C-bR-XwJfxJWu5arGKUYGbNp35eojUf1pKyLHGQc";
let unsplashApi = "https://api.unsplash.com/photos/?client_id=";

let uri = unsplashApi + accessKey;
let images;
fetch(uri)
.then(response => response.json())
.then(data => {
  images = data;
  let image = images[0].urls.regular+ "&h=600";
  let imgTag = document.createElement('img');
  imgTag.setAttribute('src', image);
  photo.appendChild(imgTag)
});




