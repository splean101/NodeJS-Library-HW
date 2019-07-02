let library = [];
let currentID = 1;

module.exports = class Book {
    constructor(author, title) {
        this.author = author;
        this.title = title;
        this._id = currentID++;
    }
    get id() {
        return this._id;
    }
    static getAllBooks() {
        return library;
    }
    static getByID(id) {
        for (let book of library) {
            if (book.id === id) {
                return book;
            }
        }
    }
    static save(book) {
        library.push(book);
    }
    static update(id, book) {
        let currentBook = Book.getByID(id);
        if (currentBook) {
            currentBook.author = book.author;
            currentBook.title = book.title;
        }
    }
    static remove(id) {
        library = library.filter(book => book.id !== id)
    }
    static has(id) {
        return Boolean(Book.getByID(id));
    }
    static isValid(book) {
        if (book.author === undefined || book.author === '' || book.title === undefined || book.title === '') {
            return false;
        } else {
            return true;
        }
    }
}