const express = require('express');
const exphdb = require('express-handlebars');
const pool = require('./db/pool');
const formatarDate = require('./functions')
const port = 8080;

const app = express();
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());

const hbs = exphdb.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res)=>{

    res.render('launch');
});

app.post('/insert/releases', (req, res)=>{
    const description = req.body.description;
    const category = req.body.category;
    const price = req.body.value;

    const currentDate = new Date().toISOString().split('T')[0];

    const sql = `INSERT INTO expenses (description, category, value, date) VALUES (?,?,?,?)`;
    const data = [description, category, price, currentDate];

    pool.query(sql, data, (err)=>{
        err ? console.log(err) : res.redirect('/')
    })
});

app.get('/dashboard', (req, res)=>{
    const sql = `SELECT * FROM expenses`;

    pool.query(sql, (err, data)=>{
        if(err){
            console.log(err);
            return
        }
        
        let value = 0;
         data.forEach((row)=>{
            value = value + parseFloat(row.value);
        })

        console.log(data)

        const newData = [];
        
        data.forEach((row)=>{
            var date = formatarDate(row.date);
            newData.push(
                {
                    id:row.id,
                    description:row.description,
                    category:row.category,
                    value:row.value,
                    date:date
                }
            )
        })

        res.render('dashboard', { newData, value });
    })
})

app.listen(port, (err)=>{
    err ? console.log(err) : console.log('Server runnig...');
})