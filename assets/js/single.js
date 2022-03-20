var issueContainerEl = document.querySelector("#issues-container")
var getRepoIssues = function(repo) {

  var apiUrl = "https://api.github.com/repos/" + repo +"/issues?directions=asc";
  fetch(apiUrl).then(function(response){
    if (response.ok){
      response.json().then(function(data){
        displayIssues(data);
      })
    }
    else{
      alert("There was a problem with your request!");
    }
  });
};
var displayIssues = function(issues) {
  if (issues.length === 0){
    issueContainerEl.textContent = "This repo has no open issues!";
  }
  for (var i = 0; i < issues.length; i++) {
    // create a link element to take users to the issue on github
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");
    var titleEl = document.createElement("span"); titleEl.textContent= issues[i].title; issueEl.appendChild(titleEl);
    
    var typeEl = document.createElement("span"); 
    // check if issue is an actual issue or a pull request 
    if (issues[i].pull_request) {
      typeEl.textContent = "(pull request)";
    }
    else {
      typeEl.textContent = "(issue)";
    }
    issueEl.appendChild(typeEl);
    issueContainerEl.appendChild(issueEl);
  }
};
getRepoIssues("facebook/react");