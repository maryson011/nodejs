const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const basePath = path.join(__dirname, 'templates');

const checkAuth = function(req, res, next){
    req.authStatus = true;

    if(req.authStatus){
        console.log('Usuário logado.')
        next()
    }else{
        console.log('Não está logado! Fazer login.')
        next()
    }
}

app.use(checkAuth);

app.get('/', (req, res)=>{
    res.sendFile(`${basePath}/index.html`);
})

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
});