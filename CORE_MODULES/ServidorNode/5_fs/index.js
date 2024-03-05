const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res)=>{
    fs.readFile('message.html', function(err, data){
        res.writeHead(200, { 'Contenty-type': 'text/html ' })
        res.write(data);
        return res.end()
    })
})

server.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
});