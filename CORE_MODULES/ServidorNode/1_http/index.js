const http = require('http');
const port = 3000;

const server = http.createServer((req, res) =>{
    res.write(`Hi, I'm Node.js server. I'm not using express or any other library, just native modules.`);
    res.end();
});

server.listen(port, () =>{
    console.log(`Server running on the port :${port}`);
});