const express = require('express');
const app = express();
const port = 5000;

// midlleware statics
app.use(express.static('public'))

const routers = require('./routers');
app.use('/', routers);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})