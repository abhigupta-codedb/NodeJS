var express = require('express');
var router = require('./routes/index');
var app=express();
app.use('/', router);
app.listen(3000);
console.log("Server listening in port 3000");
