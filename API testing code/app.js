var express = require('express')
var app = express();
// var db = require('../db');
const bodyParser = require('body-parser');
const PORT = 8080;
const HOST = 'localhost';
const DEFAULT_COLORS = ['RED', 'GREEN', 'BLUE'];


//Define request response in root URL (/)
app.get('/info', function (req, res) {
  res.send('Good Evening to all')
})

//home function 
app.get('/',function(req,res){
    res.send("welcome to home page");
});

app.use(bodyParser.json({
  limit: '100k',
}));

/**
 * Array holding color values
 */
let colors = [].concat(DEFAULT_COLORS);

/**
 * Returns a list of colors
 * Response body (JSON): {results: [....]}
 */
app.get('/colors', function(req, res, next) {
  res.json({
    results: colors
  });
});

/**
 * Inserts new color in the 'colors' array
 * Request body (JSON): {color: ...}
 */
app.post('/colors', function(req, res, next) {
  if (req.is('application/json') && typeof req.body.color === 'string') {
    let color = req.body.color.trim().toUpperCase();

    if (color && colors.indexOf(color) < 0) {
      colors.push(color);

      // 201 Created
      return res.status(201).send({
        results: colors
      });
    }
  }

  res.status(400).send(); // 400 Bad Request
});

app.listen(PORT, HOST);
console.log('Listening on %s:%d...', HOST || '*', PORT);

/**
 * Export the Express app so that it can be used by Chai
 */
module.exports = app;
