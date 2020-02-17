const express = require('express')
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express()
const port = 3000

var lastBookId = 2;
const books = [{
    id: 1,
    author: 'Aaa',
    title: 'Aaaaaa'
}, {
    id: 2,
    author: 'Bbb',
    title: 'Bbbbbb'
}];

app.use(session({secret: 'express session secret', cookie: { maxAge: 60000 }}))
app.use(bodyParser.json());
app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:8081"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "*");
      next();
});

app.post('/login', (req, res) => {
    if (req.body.username == "test" && req.body.password == "test") {
        req.session.regenerate(() => {
            req.session.user = 'test';
            res.sendStatus(204)
        });
    }
    else {
        res.sendStatus(401);
    }
});

app.get('/books', (req, res) => res.send(books));
app.post('/books', (req, res) => {
    let newBook = {...req.body}
    newBook.id = ++lastBookId;
    books.push(newBook);
    res.send(books);
});
app.delete('/books/:bookId', (req, res) => {
    for (var i = 0; i < books.length; i++) {
        if (books[i].id == req.params.bookId) {
            books.splice(i, 1);
            break;
        }
    }
    res.send(books);
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
