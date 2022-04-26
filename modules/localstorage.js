export const addTolocalStorage = (book2) => {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  books.push(book2);
  localStorage.setItem('books', JSON.stringify(books));
};

// remove from localstorage

export const removefromlocalstorage = (book2) => {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  const bookIndex = book2.innerText;
  books.splice(books.indexOf(bookIndex), 1);
  localStorage.setItem('books', JSON.stringify(books));
};