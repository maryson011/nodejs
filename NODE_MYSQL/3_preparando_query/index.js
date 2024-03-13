const express = require('express');
const exphbs = require('express-handlebars');
const pool = require('./db/conn');

const app = express();

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json());

app.use(express.static('public'));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('home');
});

app.post('/books/insertbook', (req, res)=>{
    const title = req.body.title;
    const pageqty = req.body.pageqty;

    const sql = `INSERT INTO books (??, ??) VALUES (?,?)`;
    const data = ['title', 'pageqty', title, pageqty];

    pool.query(sql, data, (err)=>{
        err ? console.log(err) : res.redirect('/books')
    })
})

app.get('/books', (req, res)=>{
    const sql = `SELECT * FROM books`

    pool.query(sql, (err, data)=>{
        if(err){
            console.log(err);
            return
        }

        const books = data;

        res.render('books', { books })
    })
})

app.get('/prod/:id', (req, res)=>{
    const id = req.params.id;

    const sql = `SELECT * FROM books WHERE ?? = ?`;
    const data = ['id', id];

    pool.query(sql, data, (err, data)=>{
        if(err){
            console.log(err);
            return
        }

        console.log(data);
        const book = data[0];
        res.render('prod', { book })
    });
})

app.get('/books/edit/:id', (req, res)=>{
    const id = req.params.id;

    const sql = `SELECT * FROM books WHERE ?? = ?`;
    const data = ['id', id];

    pool.query(sql, data, (err, data)=>{
        if(err){
            console.log(err);
            return
        }

        const book = data[0];

        res.render('editBook', { book })
    })
})

app.post('/book/updatebook', (req, res)=>{
    const id = req.body.id;

    const title = req.body.title;
    const pageqty = req.body.pageqty;

    const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`;
    const data = ['title', title, 'pageqty', pageqty, 'id', id];

    pool.query(sql, data, (err)=>{
        if(err){
            console.log(err);
            return
        }

        res.redirect('/books');
    })
})

app.post('/book/remove/:id', (req, res)=>{
    const id = req.params.id;

    const sql = `DELETE from books WHERE ?? = ?`;
    const data = ['id', id]

    pool.query(sql, data, (err)=>{
        if(err){
            console.log(err);
        }

        res.redirect('/books');
    })
})

app.listen(3000, ()=>{
    console.log('Server running...')
})
