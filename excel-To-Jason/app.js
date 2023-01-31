var express = require("express");
var app = express();
var xlsxtojson = require("xlsx-to-json");
var xlstojson = require("xls-to-json");
const mysql = require("mysql");


const pool = mysql.createPool({
  limit: 1000000,
  host: "localhost",
  user: "root",
  password: "Ramo0404",
  database: "crud_app",
});

app.use(function (req, res, next) {
  //allow cross origin requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});
// configuration
app.use(express.static(__dirname + "/public"));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.get("/", function (req, res) {
  res.send("Hello World");
});
app.post("/api/xlstojson", function (req, res) { xlsxtojson({input: "./records.xlsx",output: "output.json", lowerCaseHeaders: true,},(err, result)=> {
      if (err) throw err; 
      //else {res.json(result);}
      for (let i = 0; i < result.length; i++) {
        console.log(result[i].name_, result[i].email);
        pool.getConnection((error, connection) => {
            if (error) throw error;
            let querry = `INSERT INTO user_  VALUES ({'name_':${result[i].name_}, email:${result[i].email}})`;
            connection.query(querry, (err, results, fields) => {
              if (err) throw err;
              else{console.log('inserted to database');}
              }
            );
        });
      }
    }
  );
});
app.listen(3000);
