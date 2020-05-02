import "./scss/reset.scss";

import "./scss/index.scss";

let searchUserName = document.querySelector('#user-name');
let wrapper = document.querySelector(".wrapper");
let user;
let userName;

function fetchUri(userName) {
  let uri = `https://api.github.com/users/${userName}`;
  fetch(uri)
    .then(response => response.json())
    .then(data => {
      user = data;
      showProfile(user)
    })
}

searchUserName.addEventListener('change', (event) => {
  userName = searchUserName.value;
  console.log("userName:" + userName)
  fetchUri(userName);
})

function showProfile(user) {
  let markUPStr = `
  <div class="user">
  <img src="${user.avatar_url}" class="profilePic">
  <div class="user-name">
  User Name: <a href="https://github.com/${userName}">${user.login}</a>
  </div>
  </div>`

  console.log(markUPStr)
  wrapper.innerHTML = markUPStr;
}
