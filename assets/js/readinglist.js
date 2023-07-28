

var readingList = document.querySelector('#readingList');

displayReadingList ()

function displayReadingList () {
    readingList.innerHTML = '';
    var listFromStorage = JSON.parse(localStorage.getItem("readingList"));
    console.log(listFromStorage);
    for (let i = 0; i < listFromStorage.length; i++) {
        const book = listFromStorage[i];
        console.log(book);

        

        if (book.buyNowUrl !== '') {
            readingList.innerHTML += `
            <div class="card col-8 py-15px mb-3">
            <div class="card">
                <div class="card-header">
                Available
                <button onclick="removeBook(${i})"class="btn btn-danger btn-sm float-end">Remove</button>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">${book.authors}</p>
                    <a onclick="location.href='${book.buyNowUrl}'" class="btn btn-primary">Buy Now</a>
                </div>
            </div>
            </div>
            `
        }
        else {
            readingList.innerHTML += `
            <div class="card col-8 py-15px mb-3">
            <div class="card">
                <div class="card-header">
                This book is unavailable
                <button onclick="removeBook(${i})"class="btn btn-danger btn-sm float-end">Remove</button>
                </div>
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">${book.authors}</p>
            </div>
            </div>
            </div>
            `
        }
        

    }

}
//remove button function
function removeBook(index) {
    var listFromStorage = JSON.parse(localStorage.getItem('readingList'));
    listFromStorage.splice(index, 1);
    localStorage.setItem('readingList', JSON.stringify(listFromStorage));
    displayReadingList(); //refresh list after removal
}

