import "./sass/reset.scss";

import "./sass/index.scss";

let photo = document.querySelector(".photo");
let forwardBtn = document.querySelector(".right-button");
let backwardBtn = document.querySelector(".left-button");

let accessKey = "MQ5C-bR-XwJfxJWu5arGKUYGbNp35eojUf1pKyLHGQc";
let unsplashApi = "https://api.unsplash.com/photos/?client_id=";

let uri = unsplashApi + accessKey;
let images;
let i = 0;
fetch(uri)
  .then(response => response.json())
  .then(data => {
    images = data;
    insertImage(i);
  });

forwardBtn.addEventListener("click", (event) => {
  i++;
  console.log(`Forward button pushed`)
  insertImage(i)
  if (i == images.length - 1) {
    i = -1;
  }
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
  let image = images[i].urls.regular + "&h=600";
  photo.innerHTML = `<img src="${image}" />`;
}
