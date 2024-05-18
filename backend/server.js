const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();


app.use(express.json())
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "crud"
})


app.get('/', (req,res)=>{
    // res.json("hello")
    const sql = 'SELECT * FROM student';
    db.query(sql , (err,data) => {
      if (err) return res.json('error');
      return res.json(data);
    })
})

app.post('/create', (req,res)=>{
    const sql = "INSERT INTO student (`Name`,`Email`,`Phone`,`Date`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.date
    ]
    db.query(sql, [values], (err , data)=>{
        if(err) return res.json("Error")
            return res.json(data)
    })
})




app.put('/update/:id', (req,res)=>{
    const sql = "update student set `Name` = ?, `Email` = ?, `Phone` = ?, `Date` = ? where ID = ?"
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.date
    ]
    const id = req.params.id;

    db.query(sql, [...values,id], (err , data)=>{
        if(err) return res.json("Error")
            return res.json(data)
    })
})

app.delete('/student/:id', (req,res)=>{
    const sql = "DELETE FROM student WHERE ID = ? "
    
    const id = req.params.id;

    db.query(sql, [id], (err , data)=>{
        if(err) return res.json("Error")
            return res.json(data)
    })
})


app.listen(8081, ()=>{
    console.log('listening')
})