const overview = document.querySelector(".overview");
const username = "MarkAHotchkiss";
const repoList = document.querySelector(".repo-list");
const repoLi = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");


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
    const getRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const listOfRepos = await getRepos.json(); 
    displayRepos(listOfRepos);
  };

  const displayRepos = function (repos){
    for (let repo of repos){
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
  };

//let or const -- repoName?
  repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        let repoName = e.target.innerText;
        fetchSpecInfo(repoName);
    }
  });

  const fetchSpecInfo = async function (repoName){
    const fetchData = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchData.json(); 
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    const languages = [];
    for (const language in languageData){
        languages.push(language);        
    }
    displayRepoInfo(repoInfo, languages);
  };

  const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    repoLi.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(", ")}</p>
      <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(div);
  };