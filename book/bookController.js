const Book = require('./bookModel');
const bookView = require('./bookViev');

let bookController = {
    readAll(request, response) {
        let books = Book.getAllBooks();
        bookView.renderAll(books, response);
    },
    readOne(request, response) {
        let book = Book.getByID(request.id);
        if (book) {
            bookView.renderOne(book, response)
        } else {
            let info = `Book with ID ${request.id} was not found`;
            bookView.warning(info, response);
        }
    },
    create(request, response) {
        if (Book.isValid(request.data)) {
            let book = new Book(request.data.author, request.data.title);
            Book.save(book);
            let info = `New book created with ID: ${book.id}`;
            bookView.success(info, response);
        } else {
            let info = `Please enter the valid author or title`;
            bookView.warning(info, response);
        };
    },
    update(request, response) {
        if (!Book.has(request.id)) {
            let info = 'Book`s ID is invalid';
            bookView.warning(info, response);
        } else if (!Book.isValid(request.data)) {
            let info = 'Author or title is invalid';
            bookView.warning(info, response);
        } else {
            Book.update(request.id, request.data);
            let info = `Book updated with ID: ${request.id}`;
            bookView.success(info, response);
        }
    },
    delete(request, response) {
        if (Book.has(request.id)) {
            Book.remove(request.id);
            let info = `Book deleted with ID: ${request.id}`;
            bookView.success(info, response);
        } else {
            let info = `ID is invalid`;
            bookView.warning(info, response);
        }
    },
    /*readStyle (){
        return Book.readStyle(request, response);
    }*/
};
module.exports = bookController;