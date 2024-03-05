const http = require('http');
const port = 3000;

const server = http.createServer((req, res) =>{
    res.setHeader('Contenty-type', 'text/html');
    res.end(`<h1>Hi, I'm servidor Node.js, and I'm using an HTML tag for presentation.</h1>`);
});

server.listen(port, () =>{
    console.log(`Server running on the port :${port}`);
});