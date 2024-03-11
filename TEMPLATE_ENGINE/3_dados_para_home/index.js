const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res)=>{
    const user = {
        name: 'Maryson',
        lastName: 'Silva',
        age: 30
    }
    const learning = {
        lenguage: 'Javascript',
        framework: 'Nodejs'
    }
    res.render('home', { user: user, learning });
});

app.get('/users', (req, res)=>{
    res.render('users');
});

app.listen(3000);