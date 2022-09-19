const title = document.querySelector('#title');
const author = document.querySelector('#author');
const form = document.getElementById('book-form');
const library = document.getElementById('library');
let book;
let bookList = JSON.parse(localStorage.getItem('bookList')) || [];
function addBook() {
  book = {
    title: title.value,
    author: author.value,
    id: Math.floor(Math.random() * 1000000),
  };
  bookList.push(book);
  localStorage.setItem('bookList', JSON.stringify(bookList));
}
function removeBook(id) {
  bookList = bookList.filter((books) => books.id !== id);
  localStorage.setItem('bookList', JSON.stringify(bookList));
}
function populate(book) {
  const row = document.createElement('tr');
  const bookTitle = document.createElement('td');
  const bookAuthor = document.createElement('td');
  const removeBtn = document.createElement('button');
  const ruley = document.createElement('hr');
  bookTitle.innerText = book.title;
  bookAuthor.innerText = book.author;
  removeBtn.innerText = 'Remove';
  row.appendChild(bookTitle);
  row.appendChild(bookAuthor);
  row.appendChild(removeBtn);
  library.appendChild(row, ruley);
  removeBtn.addEventListener('click', () => {
    removeBtn.parentElement.remove();
    removeBook(book.id);
  });
}
bookList.forEach(populate);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (title.value !== '' || author.value !== '') {
    addBook();
    populate(book);
    form.reset();
  } else {
    alert('Please enter a title and author');
  }
});