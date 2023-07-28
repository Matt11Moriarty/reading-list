

var readingList = document.querySelector('#readingList');

readingList.addEventListener("click", displayReadingList)

function displayReadingList () {
    readingList.innerHTML = '';
    var listFromStorage = JSON.parse(localStorage.getItem("readingList"));
    console.log(listFromStorage);
    for (let i = 0; i < listFromStorage.length; i++) {
        const book = listFromStorage[i];
        console.log(book);
        
        readingList.innerHTML += `
        <p>${book.title}<p>
        `
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


