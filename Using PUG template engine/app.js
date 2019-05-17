var express = require('express');
var app = express();
var router = require('./route');
app.set("views", "./views");
app.set("view engine", "pug");
app.use('/', router);
app.listen(3000); 
console.log("Server listening on port 3000");
