const express = require('express');
const app = express();
const mysql = require('mysql');
const PORT = process.env.port || 1000;
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const cors = require('cors')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123",
    database: "simpleboard"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/api/get", (req, res)=>{
    const sqlQuery = "SELECT * FROM simpleboard";
    //const sqlQuery = "SELECT * FROM simpleboard ORDER BY 1 DESC lIMIT 1" ;
    db.query(sqlQuery, (err, result) => {
        res.send(result);
        
    })
})

app.post("/api/insert", (req, res)=> {
    const title = req.body.title;
    const content = req.body.content;
    const sqlQuery = "INSERT INTO simpleboard (title,content) VALUES ( ?, ?)";
    db.query(sqlQuery, [title, content], (err, result) => {
        res.send('success');
        //console.log(err, result);
    });
});


app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`);
});