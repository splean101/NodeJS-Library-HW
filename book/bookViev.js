const fs = require('fs');

function readHTML(result, response) {
    /*fs.readFile('./book/book.html', 'utf8', (error, data) => {
        data = data.replace('{result}', result);
        response.write(data);
        response.end();
     });*/
    let data = '';
    fs.createReadStream('./book/book.html', 'utf8')
        .on('data', (chunk) => data += chunk)
        .on('end', () => {
            data.replace('{result}', result);
            response.write(data);
            response.end();
        });
};

let bookView = {
    renderAll(books, response) {
        let result = '';
        books.forEach(book => {
            result += `<div> Author ${book.author}, Title ${book.title} (ID: ${book.id})`;
        });
        readHTML(result, response);
    },
    renderOne(book, response) {
        let result = `<div> Author ${book.author}, Title ${book.title} (ID: ${book.id})</div>`;
        readHTML(result, response);
    },
    success(info, response) {
        let result = `<span style="color: blue;">Is successful</span>: ${info}`;
        readHTML(result, response);
    },
    warning(info, response) {
        let result = `<div style="color: red;">Warning</div>: ${info}`;
        readHTML(result, response);
    }
};
module.exports = bookView;



