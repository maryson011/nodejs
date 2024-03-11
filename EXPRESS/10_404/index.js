const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const basePath = path.join(__dirname, 'templates');

const users = require('./users')

// ler body
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json());

// midlleware statics
app.use(express.static('public'))

app.use('/users', users);

app.get('/', (req, res)=>{
    res.sendFile(`${basePath}/index.html`);
})

// midlleware para redirencionamento page not found
app.use(function(req, res, next){
    res.sendFile(`${basePath}/404.html`);
})

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
});