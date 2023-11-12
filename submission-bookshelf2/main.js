document.addEventListener("DOMContentLoaded", function () {
  loadBooks();
});

function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  const isComplete = document.getElementById("isComplete").value === "true";

  const book = {
      id: +new Date(),
      title,
      author,
      year: parseInt(year),
      isComplete,
  };

  saveBook(book);
  clearForm();
  loadBooks();
}

function saveBook(book) {
  let books = getBooks();
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
}

function getBooks() {
  return JSON.parse(localStorage.getItem("books")) || [];
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("year").value = "";
  document.getElementById("isComplete").value = "false";
}

function loadBooks() {
  const unfinishedList = document.getElementById("unfinishedList");
  const finishedList = document.getElementById("finishedList");

  unfinishedList.innerHTML = "";
  finishedList.innerHTML = "";

  const books = getBooks();

  books.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML =`<i>Judul: ${book.title}</i><p><i>Penulis: ${book.author}</i></p><p><i>Tahun: ${book.year}</i></p><p><i>ID: ${book.id}</i></p>`;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Hapus";
    deleteButton.addEventListener("click", function () {
        deleteBook(book.id);
        loadBooks();
    });

      const moveButton = document.createElement("button");
      moveButton.innerHTML = book.isComplete ? "Pindahkan ke Belum Selesai" : "Pindahkan ke Selesai";
      moveButton.addEventListener("click", function () {
          moveBook(book.id);
          loadBooks();
      });

      card.appendChild(deleteButton);

        if (book.isComplete) {
            card.appendChild(moveButton);
            finishedList.appendChild(card);
        } else {
            card.appendChild(moveButton);
            unfinishedList.appendChild(card);
        }
    });
}

function deleteBook(id) {
  let books = getBooks();
  books = books.filter((book) => book.id !== id);
  localStorage.setItem("books", JSON.stringify(books));
}

function moveBook(id) {
  let books = getBooks();
  const index = books.findIndex((book) => book.id === id);
  books[index].isComplete = !books[index].isComplete;
  localStorage.setItem("books", JSON.stringify(books));
}
