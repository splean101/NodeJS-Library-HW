const url = require('url');
const bookController = require('./book/bookController');

module.exports = (request, response) => {
    let {query, pathname} = url.parse(request.url, true);
    if(pathname ==='/book'){
        switch(query.action){
            case 'read':
                if (query.id === '' || isNaN(query.id)){
                    bookController.readAll(request, response);
                } else {
                    request.id = + query.id;
                    bookController.readOne(request, response);
                }
                break;
            case 'create':
                request.data = {author, title} = query;
                bookController.create(request, response);
                break;
            case 'delete':
                request.id = + query.id;
                bookController.delete(request, response);
                break;
            default:
                bookController.readAll(request, response);
                break;
        }
    } else {
        bookController.readAll(request, response);
    }
}