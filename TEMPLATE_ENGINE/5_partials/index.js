const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/blog', (req, res)=>{
    const posts = [
        {
            title: 'Aprender Javascript',
            category: 'javascript',
            body: 'teste',
            coments: 5
        },
        {
            title: 'Aprender PHP',
            category: 'PHP',
            body: 'teste',
            coments: 4
        },
        {
            title: 'Aprender Python',
            category: 'Python',
            body: 'teste',
            coments: 2
        }
    ]

    res.render('blog', { posts })
})

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

app.listen(3000);