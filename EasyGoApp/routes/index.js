var express = require('express');
var router = express.Router();
var path=require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('welcome to first page');
  var str=__dirname;
  var nwstr=str.substring(0, str.length - 6);
  res.sendFile(path.join(nwstr + '/views/first.html'));
});

router.get('/home', function(req, res, next) {
  console.log('welcome to home page');
  var str=__dirname;
  var nwstr=str.substring(0, str.length - 6);
  res.sendFile(path.join(nwstr + '/views/home.html'));
});

router.get('/login', function(req, res, next) {
  console.log('welcome to login page');
  var str=__dirname;
  var nwstr=str.substring(0, str.length - 6);
  res.sendFile(path.join(nwstr + '/views/login.html'));
});

router.get('/signup', function(req, res, next) {
  console.log('welcome to signup page');
  var str=__dirname;
  var nwstr=str.substring(0, str.length - 6);
  res.sendFile(path.join(nwstr + '/views/sign_up.html'));
});

router.get('/transfer', function(req, res, next) {
  console.log('welcome to transfer page');
  var str=__dirname;
  var nwstr=str.substring(0, str.length - 6);
  res.sendFile(path.join(nwstr + '/views/transfer.html'));
});

router.get('/deposit', function(req, res, next) {
  console.log('welcome to deposit page');
  var str=__dirname;
  var nwstr=str.substring(0, str.length - 6);
  res.sendFile(path.join(nwstr + '/views/deposit.html'));
});

router.get('/details', function(req, res, next) {
  console.log('welcome to details page');
  var str=__dirname;
  var nwstr=str.substring(0, str.length - 6);
  res.sendFile(path.join(nwstr + '/views/details.html'));
});

module.exports = router;
