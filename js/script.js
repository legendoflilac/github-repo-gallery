//Target overview div
const overviewDiv = document.querySelector(".overview");
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
