//Target overview div
const overviewDiv = document.querySelector(".overview");
//Target ul holding repos
const repoUlList = document.querySelector(".repo-list");
//Username
const username = "legendoflilac";
//Selects repo information
const reposInfo = document.querySelector(".repos");
//Selects individual repo data
const repoData = document.querySelector(".repo-data");

const getProfileData = async function() {
    const req = await fetch(`https://api.github.com/users/${username}`);
    const json = await req.json();
    displayData(json);
};

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
    `;
    overviewDiv.append(newDiv);
};

getProfileData();


const getUserRepos = async function() {
    const req = await fetch(`https://api.github.com/users/${username}/repos?sort='updated'?per_page=100`);
    const json = await req.json();
    displayRepoData(json);
};

const displayRepoData = function(repos) {
    
    for (let item of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${item.name}</h3>`;
        repoUlList.append(li);
    };
};

getUserRepos();

const repoList = repoUlList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    };
});

const getRepoInfo = async function(repoName) {
    const req = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await req.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    const languages = [];
    for (let language in languageData) {
        languages.push(language);
        console.log(languages);
    }
    displayIndividualRepo(repoInfo, languages);
}


const displayIndividualRepo = function(repoInfo, languages) {
    repoData.innerHTML = "";
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(newDiv);
    repoData.classList.remove("hide");
    reposInfo.classList.add("hide");
}