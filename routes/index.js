var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb1'
});
connection.connect(function (err) {
  if (err) {
    console.log("Error connecting to Database" + err);
  } else {
    console.log("Connection established");
  }
});

router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/add', function (req, res, next) {
  res.render('addform');
});
router.post('/formprocess', function (req, res, next) {
  var a = req.body.txt1;
  var b = req.body.txt2;
  connection.query("insert into tbl_student(st_name,st_gender) values(?,?)", [a, b], function (err, result) {
    if (err) return err;
    console.log("Record inserted");
    res.redirect('/add');
  })
});

router.get('/view', function (req, res, next) {
  connection.query("select * from tbl_student", function (err, result) {
    if (err) return err;
    console.log(result);
    res.render('display', { mydata: result });
  })
});

router.get('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  connection.query("delete from tbl_student where st_id= ?",[id], function (err, result) {
    if (err) return err;
     res.redirect('/view');
  })
});

router.get('/edit/:id', function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  connection.query("select * from tbl_student where st_id= ?",[id], function (err, result) {
    if (err) return err;
    console.log(result);
    res.render('edit',{mydata:result});
  })
});

router.post('/updateprocess/:id', function (req, res, next) {
  var id = req.params.id;
  var txt1 = req.body.txt1;
  var txt2 = req.body.txt2;
  console.log(id);
  connection.query("update tbl_student set st_name = ?,st_gender=? where st_id= ?",[txt1,txt2,id], function (err, result) {
    if (err) return err;
    console.log(result);
    res.redirect('/view');
  })
});

module.exports = router;
