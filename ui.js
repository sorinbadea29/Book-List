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

  setMessage(nameOfClass, message, time){
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    const messageDiv  = document.createElement('div');
    messageDiv.classList.add(nameOfClass);
    messageDiv.appendChild(document.createTextNode(message));
    container.insertBefore(messageDiv, form);
    setTimeout(() => {messageDiv.remove()}, time);
  };

  deleteBook(target){
    target.parentElement.parentElement.remove();
  };
};
