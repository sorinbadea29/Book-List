class Book{
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  };
};

class UI{
  addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
  };

  clear(){
    document.getElementById('title').value = '',
    document.getElementById('author').value = '',
    document.getElementById('isbn').value = '';
  };

  showAlert(message, className, timeout){
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    const div  = document.createElement('div');
    div.classList.add('alert');
    div.classList.add(className);
    div.appendChild(document.createTextNode(message));
    container.insertBefore(div, form);
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, timeout);
    // setTimeout(() => {div.remove()}, timeout);
  };

  deleteBook(target){
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
      const ui = new UI;
      ui.showAlert('Book Removed!', 'success', 1500);
    };
  };
};

class Store{
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    };
    return books;
  };

  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function(book){
    const ui = new UI;
    ui.addBookToList(book);
    });
  };

  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  };

  static removeBook(isbn){
    const books = Store.getBooks();
    books.forEach(function(book, index){
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  };
};

// DOM Loaded Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

document.querySelector('#book-form').addEventListener('submit', e => {
  const title = document.getElementById('title').value,
  author = document.getElementById('author').value,
  isbn = document.getElementById('isbn').value;
  
  const book = new Book(title, author, isbn);
  const ui = new UI();
  if(title === '' || author === '' || isbn === ''){
    ui.showAlert('Faild!', 'error', 3000);
  }else{
    ui.showAlert('Book Added!', 'success', 1500);
    ui.addBookToList(book);
    Store.addBook(book); 
    ui.clear();
  };
  e.preventDefault();
});

document.querySelector('#book-list').addEventListener('click', function(e){
  const ui = new UI;
  ui.deleteBook(e.target);
  console.log(e.target.parentElement.previousElementSibling.textContent);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  e.preventDefault();
});
