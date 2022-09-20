// THE UNIVERSAL CLASS HOSTING THE AUTHOR AND TITLE INPUTS
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// STORE CLASS (LOCAL STORAGE)
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(book) {
    const bookTitle = book.querySelector('#title').innerText;
    const books = Store.getBooks();
    const filt = books.filter((book) => bookTitle === book.title);
    const filtIndex = books.indexOf(filt[0]);
    books.splice(filtIndex, 1);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// CLASS FOR THE USER DISPLAY(UI)
class UI {
  // Static to display books AND LOOP THROUGH
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((boook) => UI.addBookToList(boook));
  }

  // STATIC TO ADD BOOKS
  static addBookToList(book) {
    const books = document.querySelector('.books');
    const newBook = document.createElement('div');
    newBook.innerHTML = `
        <div>
        <div class="bookDiv">
        <div class="bookSmallDiv">
        <h4 id="title" class="bookTitleAuthor">${book.title}</h4>
        <p>By</p>
        <h4 id="author" class="bookTitleAuthor">${book.author}</h4>
        </div>
        <button class="delete">Remove</button>
        </div>
        <hr class="hr">
        </div>
        `;
    newBook.classList.add('newBook');
    books.appendChild(newBook);
  }

  // STATIC TO DELETE BOOK
  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  // STATIC TO CLEAR INPUT FIELDS AFER EACH SUBMIT
  static clearFields() {
    document.querySelector('.title').value = '';
    document.querySelector('.author').value = '';
  }
}
// EVENT TO DISPLAY BOOKS
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// EVENT TO ADD A BOOK
document.querySelector('.bookForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // get form values
  const titleInput = document.querySelector('.title').value;
  const authorInput = document.querySelector('.author').value;
  if (titleInput === '' && authorInput === '') {
    alert('Please fill author and title');
    return false;
  }
  const book = new Book(titleInput, authorInput);
  // ADD BOOK TO LIST
  UI.addBookToList(book);
  // ADD BOOK TO STORE
  Store.addBook(book);
  // CLEAR FIELDS
  UI.clearFields(book);
  return true;
});
// EVENT DELETE
document.querySelector('.books').addEventListener('click', (e) => {
  if (e.target.className === 'delete') {
    const books = e.target.parentElement;
    Store.removeBook(books);
    UI.deleteBook(e.target);
  }
});
