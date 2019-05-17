var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
res.render('sample',{title:'Hey' ,message:'Welcome'});
});
router.get('/login', function(req, res) {
res.render('sample',{title:'Hello' ,message:'Login'});
});
module.exports = router;
