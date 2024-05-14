document.addEventListener("DOMContentLoaded",()=>{
    const dialog = document.querySelector("dialog")
    const showButton = document.querySelector("#showDialog")
    const closeButton = document.querySelector("#closeDialog")


    
   
    
    showButton.addEventListener("click",()=>{
        dialog.showModal()
    })

    closeButton.addEventListener("click",()=>{
        dialog.close()
    })

    const form = document.querySelector("form")

    form.onsubmit = (event)=>{

        event.preventDefault()

        const title = document.querySelector("#title").value
        const author = document.querySelector("#author").value
        const pages = document.querySelector("#pages").value
        const read = document.querySelector("#check").checked
        const book = new Book(title,author,read,pages)
        addBookToLibrary(new Book(title,author,read,pages))
        dialog.close()
        form.reset()
        displayBook(book)

        
    }

    displayBooks()

    





})

const myLibrary = []

function Book(bookname,author,read,pages){
    this.bookname = bookname
    this.author = author
    this.read = read
    this.pages = pages

    this.info = function(){
        return `Book : ${this.bookname} , Author : ${this.author} , Read : ${this.read} , Pages : ${this.pages}`
    }
}


b = new Book("T","d",false,100)
console.log(b.read)

function addBookToLibrary(book){
    myLibrary.push(book)
    console.log("Book added")
}


function displayBooks(){
    myLibrary.forEach((book)=>{
      displayBook(book)
    })
}

function displayBook(book){
   let div = document.createElement("div")
   div.setAttribute("class","book")
   const main = document.querySelector(".book-cards")

   let header = document.createElement("h2")
   header.textContent = book.bookname;

   div.append(header)

   let info_div = document.createElement("div")
   info_div.setAttribute("id","info-div")

   let author = document.createElement("p")
   author.textContent = book.author

   let pages = document.createElement("p")

   pages.textContent = "Pages: " + book.pages

   info_div.append(pages)
   info_div.append(author)


   div.append(info_div)

   let read = document.createElement("p")


   if(book.read){
       div.setAttribute("style","border-bottom : 20px solid green")
   }
   else{
    div.setAttribute("style","border-bottom : 20px solid gray")
   }

   let footer = document.createElement("div")
   footer.setAttribute("id","footer")

   footer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width = 20px class = "delete"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>'
   
   div.append(footer)
   div.append(read)
   
   main.prepend(div)

   const deleteBook = document.querySelectorAll(".delete");
   deleteBook.forEach((button)=>{
    button.onclick = ()=>{
       button.parentElement.parentElement.remove()
       
       for(i = 0;i<myLibrary.length;i++){
        if(myLibrary[i].bookname == book.bookname){
            myLibrary.splice(i,1)
            console.log("Deleted")
            break;
        }
       }
    }
})

}


// console.log(myLibrary)
