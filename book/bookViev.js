const fs = require('fs');

function readHTML (result, response) {
    let data = '';
    fs.createReadStream('./book/book.html', 'utf8')
    .on('data', (chunk) =>  data += chunk)
    .on('end', () => data.replace('/result/', result));
    response.write(data);
    response.end();
};
let bookView = {
    renderAll (books, response){
        let result = '';
        books.forEach(book => {
            result += `<div> Author ${book.author}, Title ${book.title} (ID: ${book.id})`;
        });
        readHTML(result, response);
    },
    renderOne (book, response){
       let result = `<div> Author ${book.author}, Title ${book.title} (ID: ${book.id})</div>`;
       readHTML(result, response);
    },
    success (info, response){
        let result = `<div class="success">Is successful</div>: ${info}`;
        readHTML(result, response);
    },
    warning (info, response){
        let result = `<div class="warning">Warning</div>: ${info}`;
        readHTML(result, response);
    }
};
module.exports = bookView;



