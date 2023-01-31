const mysql = require("mysql");
//const { json } = require("stream/consumers");
const xlsx = require("xlsx");

// (B) CONNECT TO DATABASE - CHANGE SETTINGS TO YOUR OWN!
const pool = mysql.createPool({
  limit: 1000000,
  host: "localhost",
  user: "root",
  password: "Ramo0404",
  database: "crud_app",
});

// (C) OPEN EXCEL FILE - USE FIRST WORKSHEET
var workbook = xlsx.readFile("records.xlsx");
var worksheet = workbook.Sheets[workbook.SheetNames[0]];
var range = xlsx.utils.decode_range(worksheet["!ref"]);

// (D) IMPORT EXCEL
let data = [];
for (let row = range.s.r; row <= range.e.r; row++) {
  // (D1) READ CELLS
  // let data = [];
  for (let col = range.s.c; col <= range.e.c; col++) {
    let cell = worksheet[xlsx.utils.encode_cell({ r: row, c: col })];
    data.push(cell.v);
    //return console.log(JSON.stringify(data));;
  }

  // (D2) INSERT INTO DATABASE
  // pool.getConnection((error, connection) => {
  //   if (error) throw error;
  //   let querry = `INSERT INTO user_ (name_, email) VALUES (${data})`;
  //   connection.query(querry,(err, results, fields) => {
  //     if (err) throw err;
  //     //console.log("USER ID:" + results.insertId);
  //     else{console.log('inserted to database');}
  //       // console.log(JSON.stringify(data))
  //     }
  //   );
  //   //console.log("inserted to database");
  // });
}

console.table(data);


