let results = document.getElementById('results-container');
let searchParams = new URLSearchParams(document.location.search);
let searchTerm = searchParams.get('q');
let formatType = searchParams.get('format');
let queryTermEl = document.getElementById('search-query');
let searchButton = document.getElementById('search-button');
let searchForm = document.getElementById('search-form');
let searchField = document.getElementById('search-field');

apiSearch();

function apiSearch() {
  let queryUrl = "https://www.loc.gov/";

  if(formatType)
  {
    queryUrl += formatType + "/?fo=json&q=" + searchTerm;
  }

  else
  {
    queryUrl += "search/?fo=json&q=" + searchTerm;
  }

  fetch(queryUrl)
    .then(function(response) {
      if(!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (returned) {
      console.log(returned)
      queryTermEl.textContent = returned.search.query;
      
      if(!returned.results.length)
      {
        let noResults = document.createElement("h3");
        noResults.textContent = "No results found.";
        results.appendChild(noResults);
      }
      else {
        renderResults(returned.results);
      }
    })
    .catch(function(error) {
      console.error(error);
    });
}

function renderResults(resultsObj) {
  for(let i = 0; i < resultsObj.length; i++) {
    let cardEl = document.createElement("div");

    let titleAnchor = document.createElement("a");
    titleAnchor.href = resultsObj[i].url;
    let cardTitleEl = document.createElement("h3");
    titleAnchor.appendChild(cardTitleEl);
    cardEl.appendChild(titleAnchor);

    let cardBodyEl = document.createElement("ul");
    cardBodyEl.classList.add("list-unstyled");
    cardEl.appendChild(cardBodyEl);

    let dateListEl = document.createElement("li");
    let dateBoldEl = document.createElement("b");
    dateBoldEl.textContent = "Date: ";
    dateListEl.appendChild(dateBoldEl);
    cardBodyEl.appendChild(dateListEl);

    let subjectListEl = document.createElement("li");
    let subjectBoldEl = document.createElement("b");
    subjectBoldEl.textContent = "Subjects: ";
    subjectListEl.appendChild(subjectBoldEl);
    cardBodyEl.appendChild(subjectListEl);

    let descListEl = document.createElement("li");
    let descBoldEl = document.createElement("b");
    descBoldEl.textContent = "Description: ";
    descListEl.appendChild(descBoldEl);
    cardBodyEl.appendChild(descListEl);

    cardEl.classList.add("card", "bg-light", "p-3", "m-3");

    if(resultsObj[i].title)
    {
      cardTitleEl.textContent = resultsObj[i].title;
    }

    else
    {
      cardTitleEl.textContent = "Untitled";
    }

    let date = document.createTextNode("");
    
    if(resultsObj[i].date)
    {
      date.nodeValue = resultsObj[i].date;
      dateListEl.appendChild(date);
    }

    else{
      date.nodeValue = "unknown";
    }

    let subjects = document.createTextNode("");

    if(resultsObj[i].subject)
    {
      joinedSubjects = resultsObj[i].subject.join(", ");
      subjects.nodeValue = joinedSubjects;
      subjectListEl.appendChild(subjects);
    }

    else {
      date.nodeValue = "No subjects available";
    }

    let description = document.createTextNode("");

    if(resultsObj[i].description) {
      description.nodeValue = resultsObj[i].description;
      descListEl.appendChild(description);
    }
    
    results.appendChild(cardEl);
  }
}

function handleSearchSubmit(event) {
  event.preventDefault();
  
  let searchInput = document.getElementById('search-field').value.trim();
  let searchFormat = document.getElementById('format-input').value;

  if(!searchForm.checkValidity())
  {
    searchForm.reportValidity();
    return;
  }

  let queryString = './results.html?q=' + searchInput + '&format=' + searchFormat;

  location.assign(queryString);
}

searchButton.addEventListener('click', handleSearchSubmit);
searchField.addEventListener('keypress', function(event) {

  if(event.key == "Enter")
  {
    event.preventDefault();
    searchButton.click();
  }
});