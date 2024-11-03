let searchButton = document.getElementById('search-button');
let searchForm = document.getElementById('search-form');

function handleSearchSubmit(event) {
  event.preventDefault();
  
  let searchInput = document.getElementById('search-field').value;
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
