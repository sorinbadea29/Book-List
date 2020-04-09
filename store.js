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

  static displayStoredBooks() {
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
      };
    });
    localStorage.setItem('books', JSON.stringify(books));
  };
};