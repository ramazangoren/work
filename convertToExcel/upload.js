// const express = require("express");
// const app = express();
// const bodyparser = require("body-parser");
// const fs = require("fs");
// const readXlsxFile = require("read-excel-file/node");
// const mysql = require("mysql");
// const multer = require("multer");
// const path = require("path");
//use express static folder
app.use(express.static("./public"));
// body-parser middleware use
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true,}));
// Database connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Ramo0404",
//   database: "crud_app",
// });
// db.connect(function (err) {
//   if (err) {
//     return console.error("error: " + err.message);
//   }
//   console.log("Connected to the MySQL server.");
// });
// Multer Upload Storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, __basedir + "/uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
// -> Express Upload RestAPIs
// app.post("/", upload.single("uploadexcel"), (req, res) => {
//   importExcelData2MySQL(__basedir + "/uploads/" + req.file.filename);
//   console.log(res);
// });
// -> Import Excel Data to MySQL database
function importExcelData2MySQL(filePath) {
  // File path.
  readXlsxFile(filePath).then((rows) => {
    console.log(rows);
    // Remove Header ROW
    rows.shift();
    db.connect((error) => {
      if (error) throw error;
       else {
        connection.query("INSERT INTO user_ (id, name_, email) VALUES ?", [rows], (error, response) => {
          console.log(error || response);
          res.render('home', response)
        });
      }
    });
  });
}
app.listen(2020, () => {
    console.log('listening on port');
})
