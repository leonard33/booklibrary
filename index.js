import { DateTime } from './modules/luxon.js';
import Book from './modules/book.js';
import { addTolocalStorage, removefromlocalstorage } from './modules/localstorage.js';
// UI class

class UI {
  static addBookToList(book) {
    const list = document.querySelector('#t-body');
    const row = document.createElement('tr');
    row.classList.add('bookdata');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><a href"#" class="btn btn-danger delete" id="delete" ><i class="fa fa-trash"></i></a></td>
        `;
    list.appendChild(row);
 }

    static displayBooks = () => {
      return getbooks();
    }
}

// Event: Display Books

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: create a Book
const createBook = document.querySelector('#form-1');
createBook.addEventListener('submit', (e) => {
  e.preventDefault();
  if (createBook.title.value === '' || createBook.author.value === '') {
    alert('Please fill in all fields');
  } else {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;

    // console.log(title, author);
    const book = new Book(title, author);
    // console.log(book);

    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';

    UI.addBookToList(book);

    addTolocalStorage(book);
  }

});

// Event: delete a Book
const deleteBook = document.querySelector('#t-body');
deleteBook.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.parentElement.remove();
    removefromlocalstorage(e.target.parentElement.parentElement);
  }
});
// window.deleteBook = deleteBook;  making windows global
// get books from local storage
const getbooks = () => {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  books.forEach((book2) => {
    const list = document.querySelector('#t-body');
    const row = document.createElement('tr');
    row.classList.add('bookdata');
    row.innerHTML = `
        <td>${book2.title}</td>
        <td>${book2.author}</td>
        <td><a href"#" class="btn btn-danger delete" id="delete" ><i class="fa fa-trash"></i></a></td>
        `;
    list.appendChild(row);
  });

  return books;
};
// window.getbooks = getbooks;
// add to local storage



const bookListLink = document.getElementById('bookListLink');
const addBookLink = document.getElementById('addBookLink');
const contactLink = document.getElementById('contactLink');

const bookListSection = document.getElementById('bookList');
const addBookSection = document.getElementById('addBooks');
const contactSection = document.getElementById('contact');

bookListSection.style.display = 'block';
addBookSection.style.display = 'none';
contactSection.style.display = 'none';

bookListLink.addEventListener('click', () => {
  bookListSection.style.display = 'block';
  addBookSection.style.display = 'none';
  contactSection.style.display = 'none';
});

addBookLink.addEventListener('click', () => {
  bookListSection.style.display = 'none';
  addBookSection.style.display = 'block';
  contactSection.style.display = 'none';
});

contactLink.addEventListener('click', () => {
  bookListSection.style.display = 'none';
  addBookSection.style.display = 'none';
  contactSection.style.display = 'block';
});

// Displaying current date and Time using Luxon
const dateTime = document.querySelector('#date-time');
const currentTime = () => {
  const currentDateTime = DateTime.now().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
  dateTime.innerHTML = currentDateTime;
};
setInterval(currentTime, 500);
