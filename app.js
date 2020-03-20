function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
};

function UI(){}

UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td> ${book.title} </td>
    <td> ${book.author} </td>
    <td> ${book.isbn} </td>
    <td><a class="delete"> X </a></td>
  `;
  list.appendChild(row);
};

UI.prototype.showAlert = function(message, className){
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  container.insertBefore(div, form);
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
  // or
  // setTimeout(() => div.remove(), 3000);  
}

UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

UI.prototype.deleteBook = function(target){
  if(target.className = 'delete'){
    target.parentElement.parentElement.remove();
  };
};

document.getElementById('book-form').addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  const book = new Book(title, author, isbn);
  const ui = new UI;

  if(title === '' || author === '' || isbn === ''){
    ui.showAlert('Faild', 'error');
    return;
  }else{
    ui.addBookToList(book);
    ui.showAlert('Book Added', 'success');
    ui.clearFields();
  };
});

document.getElementById('book-list').addEventListener('click', e =>{
  e.preventDefault();
  const ui = new UI;
  ui.deleteBook(e.target);
});
