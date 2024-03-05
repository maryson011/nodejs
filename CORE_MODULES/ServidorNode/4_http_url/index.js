const http = require('http');
const port = 3000;

const server = http.createServer((req, res)=>{
    const urlInfo = require('url').parse(req.url, true);
    const name = urlInfo.query.name

    res.statusCode = 200;
    res.setHeader('Contenty-type', 'text/html')
    
    if(!name){
        res.end(`
        <h1>Name not defined:</h1>
        <form method="GET">
            <input type="text" name="name" placeholder="What's your name?"/>
            <input type="submit" value="Submit">
        </form>
        `)
    }else{
        res.end(`
            <h1>Welcoome ${name}</h1>
            `)
    }
})

server.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
})