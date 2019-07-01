let library = [];
let currentID = 0;

module.exports = class Book {
    constructor(author, title) {
        this.author = author;
        this.title = title;
        this._id = currentID;
    }
    get id() {
        return this._id;
    }
    static getAllBooks() {
        return library;
    }
    static getByAuthor(author) {
        for (let book of library) {
            if (book.author === author) {
                return book;
            }
        }
    }
    static getByTitle(title) {
        for (let book of library) {
            if (book.title === title) {
                return book;
            }
        }
    }
    static save(book) {
        library.push(book);
    }
    static remove(id) {
        library = library.filter(book => book.id !== id)
    }
    static has(author, title) {
        return Boolean(Book.getByAuthor(author) && Book.getByTitle(title));
    }
    static isValid(book){
        if(book.author === undefined || book.author === '' || book.title === undefined || book.title === ''){
            return false;
        } else {
            return true;
        }
    }
}