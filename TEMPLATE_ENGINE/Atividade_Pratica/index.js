const express = require('express');
const exphbs = require('express-handlebars');
const port = 3000;

const app = express();

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

const products = [
    {
        description: 'Computador Dell',
        category: 'Informática',
        brand: 'Dell',
        amount: 100
    },
    {
        description: 'Computador ASUS',
        category: 'Informática',
        brand: 'ASUS',
        amount: 120
    },
    {
        description: 'Computador Sansung',
        category: 'Informática',
        brand: 'Sansung',
        amount: 130
    },
    {
        description: 'Computador Apple',
        category: 'Informática',
        brand: 'Apple',
        amount: 10
    }
];

app.get('/', (req, res)=>{
    res.render('home', { products })
})

app.get('/:id', (req, res)=>{
    const id = req.params.id;
    var product;
    products.forEach((row)=>{
        if(row.brand === id){
            product = row
        }
    })
    res.render('product', { product })
})

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
})

