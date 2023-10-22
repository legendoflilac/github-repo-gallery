//Target overview div
const overviewDiv = document.querySelector(".overview");
//Target ul holding repos
const repoList = document.querySelector(".repo-list");
const username = "legendoflilac";

const getProfileData = async function() {
    const req = await fetch(`https://api.github.com/users/${username}`);
    const json = await req.json();
    displayData(json);
}

const displayData = function(json) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("user-info");
    newDiv.innerHTML = `
    <figure>
      <img alt="user avatar" src=${json.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${json.name}</p>
      <p><strong>Bio:</strong> ${json.bio}</p>
      <p><strong>Location:</strong> ${json.location}</p>
      <p><strong>Number of public repos:</strong> ${json.public_repos}</p>
    </div> 
    `
    overviewDiv.append(newDiv);
}

getProfileData();


const getUserRepos = async function() {
    const req = await fetch(`https://api.github.com/users/${username}/repos?sort='updated'?per_page=100`);
    const json = await req.json();
    displayRepoData(json);
}

const displayRepoData = function(repos) {
    
    for (let item of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${item.name}</h3>`;
        repoList.append(li);
    }
}

getUserRepos();