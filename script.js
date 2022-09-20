const title = document.querySelector('#title');
const author = document.querySelector('#author');
const form = document.getElementById('book-form');
const library = document.getElementById('library');
let book;
let books = JSON.parse(localStorage.getItem('books')) || [];
function addBook() {
  book = {
    title: title.value,
    author: author.value,
    id: Math.floor(Math.random() * 1000000),
  };
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}
function removeBook(id) {
  books = books.filter((book) => book.id !== id);
  localStorage.setItem('books', JSON.stringify(books));
}
function populate(book) {
  const row = document.createElement('tr');
  const bookTitle = document.createElement('td');
  const bookAuthor = document.createElement('td');
  const removeBtn = document.createElement('button');
  bookTitle.innerText = book.title;
  bookAuthor.innerText = book.author;
  removeBtn.innerText = 'Remove';
  row.append(bookTitle, bookAuthor, removeBtn);
  library.append(row);
  removeBtn.addEventListener('click', () => {
    removeBtn.parentElement.remove();
    removeBook(book.id);
  });
}
books.forEach(populate);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (title.value !== '' && author.value !== '') {
    addBook();
    populate(book);
    form.reset();
  } else {
    alert('Please enter a title and author');
  }
});