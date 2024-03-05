const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res)=>{
    const urlInfo = require('url').parse(req.url, true);
    const name = urlInfo.query.name;

    if(!name){
        fs.readFile('index.html', (err, data)=>{
            res.writeHead(200, { 'Contenty': 'text/html' });
            res.write(data);
            return res.end();
        })
    }else{
        fs.writeFile('index.txt', name, (err, data)=>{
            res.writeHead(302, {
                Location: '/',
            })
            return res.end();
        })
    }
})

server.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
})