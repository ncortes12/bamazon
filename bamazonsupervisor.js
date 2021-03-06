require("dotenv").config();
var keys = require('./keys.js');
var mysql = require('mysql');
var inquirer = require('inquirer');
var mySqlKey = keys.mySQL

var connection = mysql.createConnection({
    host: mySqlKey.host,
    port: mySqlKey.port,
    user: mySqlKey.user,
    password: mySqlKey.password,
    database: mySqlKey.database

});
connection.connect(function (err, res) {
    if (err) throw err;
    console.log("Connected to " + connection.config.database);
    startProgram();
})