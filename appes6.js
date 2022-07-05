class Book {
  constructor(title, author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
class UI{
  addBookToList(book){
    const list = document.getElementById('book-list');

    // Create tr element
    const row = document.createElement('tr');

    // insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class='delete'>X</a></td>
    `;
    list.appendChild(row);
  }

  // Show Alret

  showAlert(message, className){
    const div = document.createElement('div');
    // Add className
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent Insert to the DOM
    const container = document.querySelector('.container');

    const form = document.querySelector('#book-form');

    // Insert alret
    container.insertBefore(div, form);

    // time out after 3 seconds
    setTimeout(() =>
      document.querySelector('.alert').remove(), 3000)
  }

// Delete Book
  deleteBook(target){
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields(){
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = '';
  }

  }
// Local Storge class
class Store {
// Fetch from Local storage
  static getBooks(){
    let books;
    if(localStorage.getItem('books')=== null){
      books=[];
    }else{
      books=JSON.parse(localStorage.getItem('books'));
    }
     return books;
  }
  static displayBooks(){
    const books = Store.getBooks();
    books.forEach(function(book){
      const ui= new UI();

      // Add book to ui
      ui.addBookToList(book)
    })

  }

  static addBook(book){
    const books= Store.getBooks();
    books.push(book); 
    localStorage.setItem('books', JSON.stringify(books));

  }
  static removeBook(isbn){
   const books= Store.getBooks();
   books.forEach(function(book, index){
    if(book.isbn=== isbn){
      books.splice(index,1)
    }
   })
  }
}

// DOM LOAD Event
document.addEventListener('DOMContentLoaded',Store.displayBooks)

  // Event Listener for add Book
document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Get from Values
  const title = document.getElementById('title').value;
  author = document.getElementById('author').value;
  isbn = document.getElementById('isbn').value;

  // Instantiate Book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {
    // alert('Failed') // The simpel Alert
    // Error Alret "error is class here" 
    ui.showAlert('Please fill all feilds', 'error')

  } else {

    // Add book to List
    ui.addBookToList(book);
    // Alert add book
    ui.showAlert('Book is in yout list now', 'success')

    // Add to local Storge
    Store.addBook(book);

    // Clear fields
    ui.clearFields();
  }

  console.log(book);

})

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
  e.preventDefault();

 
  const ui = new UI();

   // Delete book
  ui.deleteBook(e.target); 
  
  //Remove from localStorage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show alert
  ui.showAlert('Book Removed', 'success');
})
