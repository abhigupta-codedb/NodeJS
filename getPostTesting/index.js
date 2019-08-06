var express =require("express");
var router=express.Router();
var http = require('http');

var server = http.createServer(function(req, res) {
	res.writeHead(200);
	res.end('Hello, Mocha!');
});

router.get('/',function(req,res){
    res.render('index',{title:'hello user'});
});

router.post('/contact',function(req,res){
    res.redirect('/thank-you');
});

router.get('/thank-you',function(req,res){
    res.render('index',{title:'Thank you user'});
});

module.exports=router;
