const mysql = require("mysql");
const readXlsxFile = require("read-excel-file/node");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const pool = mysql.createPool({
  limit: 1000000,
  host: "localhost",
  user: "root",
  password: "Ramo0404",
  database: "crud_app",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const home = ((req, res) => {
  res.render('home');
});

const uploadExcel = ( upload.single("uploadexcel"), (req, res) => {
    ExcelToMySQL(__dirname + "/uploads" + req.file.filename);
});

function ExcelToMySQL(filePath) {
    readXlsxFile(filePath).then((rows) => {
      console.log(rows);
      rows.shift();
      db.connect((error) => {
        if (error) throw error; 
        else {
          connection.query("INSERT INTO user_ (id, name_, email) VALUES ?", [rows], (error, data) => {
            console.log(error);
            res.render('data', data)
          });
        }
      });
    });
  }

module.exports = {
  home: home,
  uploadExcel: uploadExcel
};
