let users = JSON.parse(localStorage.getItem("users")) || {};
let books = JSON.parse(localStorage.getItem("books")) || [];
let loggedInUser = "";

function register() {
    let username = document.getElementById('registerUsername').value.trim();
    let email = document.getElementById('registerEmail').value.trim();
    let password = document.getElementById('registerPassword').value.trim();

    if (!username || !email || !password) {
        alert("All fields are required!");
        return;
    }

    if (users[username]) {
        alert("Username already exists! Choose another.");
        return;
    }

    users[username] = { email, password };
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
}

function login() {
    let username = document.getElementById('loginUsername').value.trim();
    let password = document.getElementById('loginPassword').value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    let storedUsers = JSON.parse(localStorage.getItem("users")) || {};

    if (storedUsers[username] && storedUsers[username].password === password) {
        loggedInUser = username;
        document.getElementById('displayUsername').innerText = username;
        document.getElementById('displayEmail').innerText = storedUsers[username].email;

        document.getElementById('welcomeSection').style.display = 'none';
        document.getElementById('librarySection').style.display = 'block';

        displayBooks(); 
    } else {
        alert("Invalid username or password. Please register if you don't have an account.");
    }
}

function logout() {
    loggedInUser = "";
    document.getElementById('welcomeSection').style.display = 'block';
    document.getElementById('librarySection').style.display = 'none';
}

function toggleUserDetails() {
    let userDetails = document.getElementById('userDetails');
    userDetails.style.display = userDetails.style.display === 'block' ? 'none' : 'block';
}

function addBook() {
    if (!loggedInUser) {
        alert("You must be logged in to add books.");
        return;
    }

    let title = document.getElementById('bookTitle').value.trim();
    let category = document.getElementById('bookCategory').value.trim();
    let link = document.getElementById('bookLink').value.trim();

    if (!title || !category || !link) {
        alert("Please fill in all fields to add a book.");
        return;
    }

    books.push({ title, category, link, addedBy: loggedInUser });
    localStorage.setItem("books", JSON.stringify(books));

    document.getElementById('bookTitle').value = '';
    document.getElementById('bookCategory').value = '';
    document.getElementById('bookLink').value = '';

    displayBooks();
}

function displayBooks() {
    let bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    books.forEach((book, index) => {
        bookList.innerHTML += `
            <div class="book-item">
                <span><strong>${book.title}</strong> (${book.category}) - Added by ${book.addedBy}</span>
                <a href="${book.link}" target="_blank">📖 Read  </a>
                ${book.addedBy === loggedInUser ? `<button onclick="removeBook(${index})">❌ Remove</button>` : ''}
            </div>`;
    });
}

function removeBook(index) {
    if (books[index].addedBy !== loggedInUser) {
        alert("You can only remove books that you added.");
        return;
    }

    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
}

function searchBooks() {
    let query = document.getElementById('search').value.toLowerCase();
    let filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
    );

    let bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    filteredBooks.forEach((book, index) => {
        bookList.innerHTML += `
            <div class="book-item">
                <span><strong>${book.title}</strong> (${book.category}) - Added by ${book.addedBy}</span>
                <a href="${book.link}" target="_blank">📖 Read</a>
                ${book.addedBy === loggedInUser ? `<button onclick="removeBook(${index})">❌ Remove</button>` : ''}
            </div>`;
    });
}

window.onload = function () {
    users = JSON.parse(localStorage.getItem("users")) || {};
    books = JSON.parse(localStorage.getItem("books")) || [];
};
