const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 3001;
let cors = require("cors");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'usr',
    password: 'pswd',
    database: 'data'
});
app.use(cors());
app.use(express.json());
connection.connect();

app.get('/search', (req, res) => {
    const text = req.query.id
    const query = `SELECT * FROM data_mroi_new.tbl_usr where UserName like '%${text}%'`
    let data = [];
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log("error");
        }
        else {
            console.log(results);
            res.send(results);
        }
    });

    // connection.end();

});

app.post('/add', (req, res) => {
    console.log(req.body, "/add req");
    const query = `insert into data_mroi_new.tbl_usr(UserName,Role,LastLogin,FName,LName,Department,DOJ,MgrId,Seniority,EmpCode) values('${req.body.userName}','${req.body.role?.value}','${req.body.lastLogin || "null"}','${req.body.FName}','${req.body.LName}','${req.body.department?.value}','${req.body.doj}','${req.body.mgrID}','${req.body.seniority}','${req.body.empCode}');`

    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log("error");
        }
    });

    // connection.end();
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Serveris is Running" + PORT)
    else
        console.log("Error", error);
}
);