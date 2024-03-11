const express = require('express');
const router = express.Router();

const path = require('path');

const basePath = path.join(__dirname, '../templates');

router.get('/users', (req,res)=>{
    res.sendFile(`${basePath}/users.html`);
})

router.get('/admin', (req,res)=>{
    res.sendFile(`${basePath}/admin.html`);
})

router.get('/', (req, res)=>{
    res.sendFile(`${basePath}/home.html`);
})

module.exports = router;