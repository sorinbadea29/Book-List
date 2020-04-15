function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn; 
};
let book = new Book;

function UI(){};
let ui = new UI;

UI.prototype.addBookToList = function(book){
  let row = document.createElement('tr');
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;
  document.getElementById('book-list').appendChild(row);
};

UI.prototype.clear = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

UI.prototype.deleteBook = function(target){
  target.parentElement.parentElement.remove();
};

UI.prototype.setMessage = function(nameOfClass, message, time){
  let container = document.querySelector('.container');
  let form = document.getElementById('book-form');
  let messageDiv = document.createElement('div');
  messageDiv.className = nameOfClass;
  messageDiv.textContent = message;
  setTimeout(() => {
    messageDiv.remove();
  }, time);
  container.insertBefore(messageDiv, form);
};

function Store(){};

Store.prototype.getbooksFromStorage = function(books){
  if(localStorage.getItem('books') === null){
   books = [];
  }else{
    books = JSON.parse(localStorage.getItem('books'));
  };
  return books;
};

Store.prototype.displayBooksFromStorage = function(){
  const books = Store.prototype.getbooksFromStorage();
  books.forEach(function(book){
    ui.addBookToList(book);
  });
};

Store.prototype.storeBookInStorage = function(book){
  const books = Store.prototype.getbooksFromStorage();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
};

Store.prototype.deleteBookFromStorage = function(isbn){
  const books = Store.prototype.getbooksFromStorage();
  books.forEach(function(book, index){
    if(book.isbn === isbn){
      books.splice(index, 1);
    };
  });
  localStorage.setItem('books', JSON.stringify(books));
};

document.addEventListener('DOMContentLoaded', Store.prototype.displayBooksFromStorage());

document.getElementById('book-form').addEventListener('submit', e =>{
  e.preventDefault();
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let isbn = document.getElementById('isbn').value;

  if(title === '' || author === '' || isbn === ''){
    ui.setMessage('red', 'Please, fill all the book fields', 3000);
  }else{
    book = new Book(title, author, isbn);
    ui.addBookToList(book);
    Store.prototype.storeBookInStorage(book);
    ui.setMessage('green', 'Book Added!', 2000);
    ui.clear();
  };
});

document.querySelector('#book-list').addEventListener('click', e => {
  if(e.target.classList.contains('delete')){
    ui.deleteBook(e.target);
    Store.prototype.deleteBookFromStorage(e.target.parentElement.previousElementSibling.textContent);
    ui.setMessage('green', 'Book Removed!', 2000);
  }
});
