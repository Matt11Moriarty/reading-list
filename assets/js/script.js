document.addEventListener('DOMContentLoaded', function() {

var googleApiKey = 'AIzaSyCMRulduu9lrdze-0XMvjZD3qSv5Kweg_g'
var googleApi = 'https://www.googleapis.com/books/v1/volumes?' 

var gifApiKey = 'BapaP6tBvX47P2VTz6hSD0ZageGjw2Mu'
var gifApi = 'https://api.giphy.com/v1/gifs/search?'
//https://api.giphy.com/v1/gifs/search?limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips&q=harry+potter&api_key=BapaP6tBvX47P2VTz6hSD0ZageGjw2Mu

//query selectors

var searchButton = document.querySelector('#searchButton');
var searchInput = document.querySelector('#searchBar');
var gifElement = document.querySelector('#gifEl');
var cancelButton = document.querySelector('#cancelButton');
var searchResults = document.querySelector('#searchResults')


//event listener
searchButton.addEventListener('click', function () {
    var searchInputValue = searchInput.value;
    formatSearch(searchInputValue);
});

//Event listener for enter key press in search input
searchBar.addEventListener('keydown', function (event) {
    //check if key pressed is enter key (key code 13)
    if (event.keyCode === 13) {
        event.preventDefault();
        const searchInputValue = searchBar.value;
        formatSearch(searchInputValue);
    }
});

//functions

//replaces " " with "+"
function formatSearch (unformattedSearch) {
    var formattedSearch = unformattedSearch.replace(/\s+/g, '+');
    getResults(formattedSearch);
    getGif(formattedSearch);
}


function getResults (trimmedSearchValue) {
    var searchResultsUri = `${googleApi}q=${trimmedSearchValue}&maxResults=10&key=${googleApiKey}`
    var results = []

    fetch(searchResultsUri)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        for (let i = 0; i < data.items.length; i++) {
            const book = data.items[i];
            results.push(book);
        }
        generateResultsList(results);
    })
    .catch(function (error) {
        console.error('Error fetching data:', error);
    });
    // console.log(results[0].volumeInfo.title);
    
}  
// event listener for "add to reading list"
searchResults.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-primary')) {
        var card = event.target.closest('.card');
        var title = card.querySelector('.card-title').textContent;
        var authors = card.querySelector('.card-text:nth-child(3)').textContent;
        var smallThumbnail = card.querySelector('.card-img-top').getAttribute('src');
        var purchaseLink = card.querySelector('.card-title').dataset.buynowlink;
        addtoReadingList(title, authors, smallThumbnail, purchaseLink);
        showReadingListModal();
    }
});

function showReadingListModal () {
    var modal = document.querySelector('#reading-list-modal');
    modal.classList.remove("hidden");

    setTimeout(function() {
        modal.classList.add("hidden");
    }, 1500)

}

//get reading list from local storage
function addtoReadingList(title, authors, smallThumbnail, purchaseUrl) {
    var existingList = JSON.parse(localStorage.getItem('readingList')) || [];
    var isBookInList = existingList.some(function(book) {
        return book.title === title;
    });

    if (!isBookInList) {
        existingList.push( {
            title: title,
            authors: authors,
            smallThumbnail: smallThumbnail,
            buyNowUrl: purchaseUrl
        });
        localStorage.setItem('readingList', JSON.stringify(existingList));
    }
}

// event listener for cancel button
cancelButton.addEventListener('click', function () {
    searchInput.value = '';
    searchResults.innerHTML = '';
})

  // Event listener for the form's submit event
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    var searchInputValue = searchInput.value;
    formatSearch(searchInputValue);
  });

//get gif api
function getGif (trimmedSearchValue) {
    var gifResultApi = `${gifApi}limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips&q=${trimmedSearchValue}&api_key=${gifApiKey}`

    fetch(gifResultApi)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var link = data.data[0].images.original.url;
        return generateGif(link);
    })
}

//create list 
function generateResultsList (resultsArray) {
    searchResults.innerHTML = '';
    for (let i = 0; i < resultsArray.length; i++) {
        const book = resultsArray[i];
        var purchaseLink = ''
        var subtitle = ''
        if (book.volumeInfo.subtitle) {
            subtitle = book.volumeInfo.subtitle
        }
        if (book.saleInfo.buyLink) {
            purchaseLink = book.saleInfo.buyLink;
        }
        console.log(purchaseLink);
        searchResults.innerHTML += `        
        <div class="card col-12 col-sm-6 col-md-4 col-lg-3 shadow-lg p-2 mb-5 bg-white rounded m-2">
            <img class="card-img-top" src="${book.volumeInfo.imageLinks.smallThumbnail}" alt="Image of ${book.volumeInfo.title} cover">
            <div class="card-body">
                <h5 data-buynowlink="${purchaseLink}" class="card-title">${book.volumeInfo.title}</h5>
                <p class="card-text">${subtitle}</p>
                <p class="card-text">${book.volumeInfo.authors.join(", ")}</p>
                <a href="#" class="btn btn-primary reading-list-btn">Add to reading list</a>
            </div>
        </div>
        `;
    }
}

function generateGif (gifLink) {
    gifElement.innerHTML = '';
    gifElement.innerHTML += `
    <img src="${gifLink}" alt="Gif from search result">
    `
}

});
