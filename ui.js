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
    setTimeout(() => {div.remove()}, timeout);
  };

  deleteBook(target){
    target.parentElement.parentElement.remove();
  };
};