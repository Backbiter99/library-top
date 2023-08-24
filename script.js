const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
}

const button = document.getElementById("button");
button.addEventListener("click", (e) => {
  createForm();
});

const formContainer = document.getElementById("form-container");

function createForm() {
  formContainer.innerHTML = "";

  const form = document.createElement("form");
  form.method = "post";

  const fields = [
    {
      label: "Book Name:",
      type: "text",
      name: "bookName",
      required: true,
    },
    {
      label: "Book Author:",
      type: "text",
      name: "bookAuthor",
      required: true,
    },
    {
      label: "Number of pages:",
      type: "number",
      name: "bookPages",
      required: true,
    },
  ];

  fields.forEach((field) => {
    const fieldDiv = createFormField(
      field.label,
      field.type,
      field.name,
      field.required
    );
    form.appendChild(fieldDiv);
  });

  const readFieldset = document.createElement("fieldset");
  const readLegend = document.createElement("legend");
  readLegend.textContent = "Have You Read the Book";
  readFieldset.appendChild(readLegend);

  const yesLabel = createRadioLabel("Yes", "bookRead", "yes", true);
  const noLabel = createRadioLabel("No", "bookRead", "no", false);

  readFieldset.appendChild(yesLabel);
  readFieldset.appendChild(noLabel);

  form.appendChild(readFieldset);

  const submitButton = document.createElement("button");
  submitButton.type = "button";
  submitButton.textContent = "Submit Form";

  submitButton.addEventListener("click", handleSubmit);
  form.appendChild(submitButton);

  formContainer.appendChild(form);
}

function createFormField(labelText, type, name, required) {
  const div = document.createElement("div");
  const label = document.createElement("label");
  label.textContent = labelText;
  label.htmlFor = name;

  const input = document.createElement("input");
  input.type = type;
  input.id = name;
  input.name = name;
  if (required) {
    input.required = true;
  }

  div.appendChild(label);
  div.appendChild(input);

  return div;
}

function createRadioLabel(labelText, name, value, checked) {
  const label = document.createElement("label");

  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = name;
  radio.value = value;
  if (checked) {
    radio.checked = true;
  }

  label.appendChild(radio);
  label.appendChild(document.createTextNode(labelText));

  return label;
}

function handleSubmit(e) {
  e.preventDefault();

  const bookName = document.getElementById("bookName").value;
  const bookAuthor = document.getElementById("bookAuthor").value;
  const bookPages = document.getElementById("bookPages").value;
  const bookRead = document.querySelector(
    'input[name="bookRead"]:checked'
  ).value;

  addBookToLibrary(bookName, bookAuthor, bookPages, bookRead);
  displayBooks();
}

const bookContainer = document.getElementById("book-container");

function displayBooks() {
  while (formContainer.firstChild) {
    formContainer.removeChild(formContainer.firstChild);
  }
  while (bookContainer.firstChild) {
    bookContainer.removeChild(bookContainer.firstChild);
  }
  for (let i = 0; i < myLibrary.length; i++) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("display");

    const bookTitle = document.createElement("h2");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = `Book Title: ${myLibrary[i].title}`;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = `Book Author: ${myLibrary[i].author}`;

    const bookPages = document.createElement("p");
    bookPages.classList.add("book-pages");
    bookPages.textContent = `Number of Pages in the Book: ${myLibrary[i].pages}`;

    const bookRead = document.createElement("p");
    bookRead.classList.add("book-read");
    bookRead.textContent = `Read Status: ${
      myLibrary[i].isRead == "yes" ? "READ" : "UNREAD"
    }`;

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookRead);

    const removeBook = document.createElement("button");
    removeBook.textContent = "Remove Book";

    removeBook.addEventListener("click", () => {
      removeBookFromLibrary(i);
      displayBooks();
    });

    bookCard.appendChild(removeBook);

    const readStatus = document.createElement("button");
    readStatus.textContent = "Change Read Status";
    readStatus.addEventListener("click", () => {
      changeReadStatus(i);
      displayBooks();
    });

    bookCard.appendChild(readStatus);

    bookContainer.appendChild(bookCard);
  }

  function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
  }

  function changeReadStatus(index) {
    if (myLibrary[index].isRead === "yes") {
      myLibrary[index].isRead = "no";
    } else {
      myLibrary[index].isRead = "yes";
    }
  }
}
