let myLinks = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage
    render(myLinks)
} 

function render(links) {
    listItems = ""
    for (count = 0; count < links.length; count++) {
    listItems+= `<li><a target='_blank' href='${links[count]}'>${links[count]}</a></li>`
    ulEl.innerHTML = listItems
}
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        render(myLinks)
    })  
})

deleteBtn.addEventListener("dblclick", function() {
    myLinks = []
    localStorage.clear()
    render(myLinks)
    location.reload()
})

inputBtn.addEventListener("click", function() {
    myLinks.push(inputEl.value)
    clearTextField()
    localStorage.setItem("myLinks", JSON.stringify(myLinks))
    render(myLinks)
})

function clearTextField() {
    inputEl.value = ""
}


