const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'Test@123',
	database:'test',
	multipleStatements: true
})

mysqlConnection.connect((err) =>{
	if(!err){
		console.log('Db connection succeeded');
	}
	else{
		console.log('DB connection failed \ Error: ' + JSON.stringify(err,undefined,2));
	}
})

app.listen(3000,()=>{
	console.log('Express server is runnig port no :3000')
})

//Get all employee
app.get('/employee',(req,res) => {
	mysqlConnection.query('SELECT * FROM employee',(err,rows,fields)=>{
		if(!err){
			console.log(rows);
			res.send(rows);
		}
		else{
			console.log(err);
		}
	})
})

//Get an employee
app.get('/employee/:id',(req,res) => {
	mysqlConnection.query('SELECT * FROM employee WHERE EmpID = ?',[req.params.id],(err,rows,fields)=>{
		if(!err){
			console.log(rows);
			res.send(rows);
		}
		else{
			console.log(err);
		}
	})
})

//Get delete an employee
app.delete('/employee/:id',(req,res) => {
	mysqlConnection.query('DELETE FROM employee WHERE EmpID = ?',[req.params.id],(err,rows,fields)=>{
		if(!err){
			res.send('Deleted successfully');
		}
		else{
			console.log(err);
		}
	})
})

//insert an employee
app.post('/employee',(req,res) => {
	let emp = req.body;
	var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @salary = ?; \
    CALL EmployeeAddorEdit(@EmpID,@Name,@EmpCode,@salary);";
	mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.salary],(err,rows,fields)=>{
		if(!err){
			 rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].EmpID);
            });
		}
		else{
			console.log(err);
		}
	})
})

//update an employee
app.put('/employee',(req,res) => {
	let emp = req.body;
	var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @salary = ?; \
    CALL EmployeeAddorEdit(@EmpID,@Name,@EmpCode,@salary);";
	mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.salary],(err,rows,fields)=>{
		if(!err){
			 
                res.send('Updated successfully');
		}
		else{
			console.log(err);
		}
	})
})