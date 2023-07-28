

var readingList = document.querySelector('.readingList');

readingList.addEventListener("click", displayReadingList)

function displayReadingList () {
    readingList.innerHTML = '';
    var listFromStorage = JSON.parse(localStorage.getItem("readingList"));
    console.log(listFromStorage);
    for (let i = 0; i < listFromStorage.length; i++) {
        const book = listFromStorage[i];
        console.log(book);
        if (book.buyNowUrl !== '') {
            var buyNow = book.buyNowUrl
            readingList.innerHTML += `
            <h4>${book.title}</h4><button onclick="location.href = '${book.buyNowUrl}'" type="button" class="btn btn-primary">Buy Now</button>
            `
        }
        else {
            var buyNow = 'This book is not available for purchase'
            readingList.innerHTML += `
            <h4>${book.title} <span class="badge badge-secondary">${buyNow}</span></h4>
            `
        }
        

    }

}
var removeButton = document.getElementById('removeBtn');
var buyButton = document.getElementById('buyButton'); 

removeButton.classList.add('invisible')
buyButton.classList.add('invisible')

readingList.onclick = ()=> {
buyButton.classList.remove('invisible');
removeButton.classList.remove('invisible')
 
}


