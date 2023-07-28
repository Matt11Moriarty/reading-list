

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
                <div class="card-header bg-success">
                Available
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
                <div class="card-header bg-danger">
                This book is unavailable
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


