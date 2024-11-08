let searchButton = document.getElementById('search-button');
let searchForm = document.getElementById('search-form');
let searchField = document.getElementById('search-field');

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