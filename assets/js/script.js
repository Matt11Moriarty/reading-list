
var apiKey = 'AIzaSyCMRulduu9lrdze-0XMvjZD3qSv5Kweg_g'
var googleApi = 'https://www.googleapis.com/books/v1/volumes?' 

//query selectors
var searchButton = document.querySelector('#searchButton');
var searchInputValue = document.querySelector('#searchBar').value;

//event listeners
searchButton.addEventListener('click', formatSearch(searchInputValue));


//functions

//replaces " " with "+"
function formatSearch (unformattedSearch) {
    var formattedSearch = unformattedSearch.replace(/\s+/g, '+');
    return getResults(formattedSearch);
}


function getResults (trimmedSearchValue) {
    var searchResultsUri = `${googleApi}q=${trimmedSearchValue}&maxResults=10`
    var results = []

    fetch(searchResultsUri).then(function(response) {
        return response.json();
    })
    .then(function(data) {
        for (let i = 0; i < data.items.length; i++) {
            const book = data.items[i];
            results.push(book);
        }
    })
    // console.log(results[0].volumeInfo.title);
    return results;
}  

