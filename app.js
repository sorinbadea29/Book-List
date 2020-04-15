const ui = new UI;

class Book{
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  };
};

// DOM Loaded Event
document.addEventListener('DOMContentLoaded', Store.displayStoredBooks);

document.querySelector('#book-form').addEventListener('submit', e => {
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  
  const book = new Book(title, author, isbn);
  if(title === '' || author === '' || isbn === ''){
    ui.setMessage('red', 'Faild!', 3000);
  }else{
    ui.setMessage('green', 'Book Added!', 1500);
    ui.addBookToList(book);
    Store.addBook(book); 
    ui.clear();
  };
  e.preventDefault();
});

document.querySelector('#book-list').addEventListener('click', function(e){
  if(e.target.className === 'delete') {
    ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.setMessage('green', 'Book Removed!', 1500);
  };
});
