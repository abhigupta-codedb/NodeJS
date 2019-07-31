// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
   
//     var sql = require("mssql");

//     // config for your database
//     var config = {
//         user: 'sa',
//         password: 'mypassword',
//         server: 'localhost', 
//         database: 'SchoolDB' 
//     };

//     // connect to your database
//     sql.connect(config, function (err) {
//     console.log(config)
//         if (err) console.log(err);

//         // create Request object
//         var request = new sql.Request();
           
//         // query to the database and get the records
//         request.query('select * from Student', function (err, recordset) {
            
//             if (err) console.log(err)

//             // send records as a response
//             console.log(recordset)
//             res.send(recordset);
            
//         });
//     });
// });

var mongoose = require('mongoose');

const MONGODBURI = 'mongodb://USER:password@ds000256-a0.mlab.com:52569,ds26359839-a1.mlab.com:579449/feedback?replicaSet=rs-ds257239';
//var logger = require('../universityLogger/logger');
var conn = mongoose.connect(MONGODBURI)
.then(() => {
    Console.log('Connected sucessfully');
})
.catch(err => {
    Console.log('The error is', err);
});

module.exports = conn;

