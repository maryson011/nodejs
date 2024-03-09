const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// ler body
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json());

const basePath = path.join(__dirname, 'templates');

app.get('/users/add', (req, res)=>{
    res.sendFile(`${basePath}/userForm.html`)
})

app.post('/users/save', (req, res)=>{
    console.log(req.body)

    const name = req.body.name;
    const age = req.body.age;

    console.log(`O nome do usuário é ${name} e a idade é ${age}`);

    res.sendFile(`${basePath}/userForm.html`);
})

app.get('/users/:id', (req, res)=>{
    const id = req.params.id;
    // ler tabela users para resgatar usuario
    console.log(`Estamos buscando pelo usuário ${id}`);
    res.sendFile(`${basePath}/user.html`)
})

app.get('/', (req, res)=>{
    res.sendFile(`${basePath}/index.html`);
})

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
});