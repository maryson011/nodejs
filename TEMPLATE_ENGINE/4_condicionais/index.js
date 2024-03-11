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

    const auth = true;

    res.render('home', { user: user, learning, auth });
});

app.get('/dashboard', (req, res)=>{
    const list = ['1º','2º','3º','4º'];

    res.render('dashboard', { list });
});

app.get('/post', (req,res)=>{
    const post = {
        title: 'Aprender Nodejs',
        category: 'Javascript',
        body: 'Este artigo vai te ajudar a aprender Nodejs...',
        coments: 4
    }

    res.render('blog', { post })
})

app.listen(3000);