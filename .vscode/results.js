let results = document.getElementById('results-container');
let searchParams = new URLSearchParams(document.location.search);
let searchTerm = searchParams.get('q');
let formatType = searchParams.get('format').toLowerCase();

apiSearch();

function apiSearch() {
  let queryUrl = "https://www.loc.gov/";

  if(formatType)
  {
    queryUrl = queryUrl + formatType + "/?fo=json&q=" + searchTerm;
    console.log(searchTerm);
    console.log(queryUrl);
  }

  else
  {
    queryUrl += "search/?fo=json&q=" + searchTerm;
    console.log(queryUrl);
  }

  fetch("https://www.loc.gov/maps/?fo=json&q=new%20york")
    .then(function(response) {
      if(!response.ok) {
        throw response.json();
      }
      
      return response.json();
      console.log(response.json);
    })
    .then(res) {
      console.log(res)
    };
}