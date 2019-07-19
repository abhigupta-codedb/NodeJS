var express=require("express");
var mysql=require("mysql");
var app=express();
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:false}))
var connection=mysql.createConnection({
    // connectionLimit:50,
    host:"localhost",
    user:"root",
    password:"",
    database:"employee"
});

connection.connect(function(error){
    //callback
    if(error)
        console.log(error);

    else
        console.log("connected");
});


//sending update html
app.get('/updatePage',function(req,res){
    
    res.sendFile("update.html",{root:__dirname});
})

//submitting form data to database
app.get('/update',function(req,res){
    
    console.log("inside update");

    console.log(req.query);
    var sql="update empTable set department='"+req.query.dept+"',salary='"+req.query.salary+"' where id='"+req.query.id+"'   ";

    connection.query(sql,function(error){

        if(error)
        {
            console.log("error in update query");
            res.send("error in update query");
        }

        else
        {
            console.log("Data updated Successfully");
            res.send("Data updated Successfully");
        }
    })

    console.log(req.params.name);
})

//sending insert html
app.get('/insertPage',function(req,res){
    
    res.sendFile("insert.html",{root:__dirname});
})

//submitting form data to database
app.get('/submit',function(req,res){
    
    console.log(req.query);
    var sql="insert into empTable values( null,'"+req.query.name+"','"+req.query.dept+"','"+req.query.salary+"')";

    connection.query(sql,function(error){

        if(error)
        {
            console.log("error in insert query");
            res.send("error in insert query");
        }

        else
        {
            console.log("Data saved Successfully");
            res.send("Data saved Successfully");
        }
    })

    console.log(req.params.name);
})


app.get('/deletePage',function(req,res){
    
    res.sendFile("delete.html",{root:__dirname});
})


//Delete Employee by ID
//working through postman
app.delete('/:id',function(req,res){
    //about sql
    connection.query("delete from empTable where id=?",[req.params.id],function(error,rows,fields){
        //call back function
        if(error)
        console.log("errro in query");

        else
        {
            console.log("successfully deleted");
            res.send("successfully deleted");         
        }
    });

})


//get all data fields
app.get('/',function(req,res){
    //about sql
    connection.query("select * from empTable",function(error,rows,fields){
        //call back function
        if(error)
        console.log("errro in query");

        else
        {
            console.log("successfull query\n");
            console.log(rows);
            res.json(rows);
            // console.log(rows[0].Name);
            // res.send("Hello "+rows[0].Name);
        }
    });
})


//get Employee by ID
app.get('/:id',function(req,res){
    
    connection.query("select * from empTable where id=?",[req.params.id],function(error,rows,fields){
        
        if(error)
        console.log("errro in query");

        else
        {
            console.log("successfull query\n");
            console.log(rows);
            res.json(rows);
            // console.log(rows[0].Name);
            // res.send("Hello "+rows[0].Name);
        }
    });

})





// //Insert an employees
// app.post('/employees', (req, res) => {
//     let emp = req.body;
//     var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
//     CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
//     mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
//         if (!err)
//             rows.forEach(element => {
//                 if(element.constructor == Array)
//                 res.send('Inserted employee id : '+element[0].EmpID);
//             });
//         else
//             console.log(err);
//     })
// });

app.listen(1337);
