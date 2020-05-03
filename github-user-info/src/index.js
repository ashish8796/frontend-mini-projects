import "./scss/reset.scss";

import "./scss/index.scss";

let searchUserName = document.querySelector('#user-name');
let wrapper = document.querySelector(".wrapper");
let userDetalils = document.querySelector(".div-1");
let reposDiv = document.querySelector(".repos")
let followerListDiv = document.querySelector(".followers-list");

let user;
let userName;

function fetchUri(userName) {
  let uri = `https://api.github.com/users/${userName}`;
  fetch(uri)
    .then(response => response.json())
    .then(data => {
      user = data;
      showProfile(user)
      showRepos(user)
      showFollowers(user)
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
    <div class="user-details">
      <div >
        <div class="user-name">
          <p class="name">${user.name}</p> <a href="https://github.com/${userName}" target="blank">@${user.login}</a>
        </div>
        <p class="bio">${user.bio || " "}</p>
        <p class="company">${user.company || " "}<i class="fas fa-map-marker-alt" id="location"></i>${user.location || " "}</p>
        <p class="blog"><i class="fas fa-blog" id="blog"></i><a href="${user.blog}" target="blank">${user.blog || " "}</a></p>
      </div>

      <div class="user-follow-repo">
        <div class="followers">
          ${user.followers}
          <p>Followers</p>
        </div>
        <div class="following">
          ${user.following}
          <p>Following</p>
        </div>
        <div class="repos-count">
          ${user.public_repos}
          <p>Repos</p>
        </div>
      </div>

    </div>
  </div>`

  userDetalils.innerHTML = markUPStr;
}

function showRepos(user) {
  console.log(user.repos_url)
  fetch(user.repos_url)
    .then(response => response.json())
    .then(data => {
      let repos = data;

      let repoString = repos.map(repo => {
        return `
        <div>
          <a href=${repo.html_url} target="blank">${repo.name}</a>
          <p>${repo.description || " "}</p>
          <p>${repo.language} <i class="fas fa-star"></i> ${repo.stargazers_count} <i class="fas fa-code-branch"></i> ${repo.forks_count}
        </div>
      `
      }).join("")
      console.log(repoString)

      reposDiv.innerHTML = `<h1>Repositories</h1>
      ${repoString}`;
    })
}

function showFollowers(user) {
  fetch(user.followers_url)
    .then(response => response.json())
    .then(data => {
      let followers = data;
      let followerString = followers.map(follower => {
        return `
        <div>
          <img src="${follower.avatar_url}"> <a href="${follower.html_url}" target="blank">@${follower.login}</a>
        </div>
        `
      }).join("")
      console.log(followerString)
      followerListDiv.innerHTML = `<h1>Followers</h1>
      ${followerString}`;
    })
}
