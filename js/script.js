const overview = document.querySelector(".overview");
const username = "MarkAHotchkiss";
const unorderedList = document.querySelector(".repo-list");

const getUserInfo = async function () {
    const userProfileInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userProfileInfo.json();
    console.log(data);
    showUserInfo(data);
    
  };
  
  getUserInfo();

  const showUserInfo = function(data){
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
    `;
    overview.append(div);
    findRepos();
  };

  const findRepos = async function(){
    const repoList = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const listOfRepos = await repoList.json(); 
    displayRepos(listOfRepos);
  };

  const displayRepos = function (repos){
    for (let repo of repos){
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        unorderedList.append(repoItem);
    }
  };

  
