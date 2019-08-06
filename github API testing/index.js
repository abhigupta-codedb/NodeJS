var express=require("express");
var app=express();

app.get('/',function(req,res){

    res.sendFile("home.html",{root:__dirname});

});

app.get('/user',function(req,res){
    console.log("username : "+req.query.username);
    var url="https://api.github.com/users/"+req.query.username;
    
    res.redirect(url);

    return res;
    
});
app.get('/allusers',function(req,res){
    console.log("Inside all users function");
    var url="https://api.github.com/users";
    
    res.redirect(url);

    console.log(JSON.stringify(req.body));
    return res;
});

app.listen( 3000 , () => {
    console.log(' app listening on 3000 '); 
})
