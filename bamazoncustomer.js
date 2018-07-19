require("dotenv").config();
var keys = require('./keys.js');
var mysql = require('mysql');
var inquirer = require('inquirer');
var mySqlKey = keys.mySQL

// console.log(mySqlKey.host, mySqlKey.port, mySqlKey.user, mySqlKey.password, mySqlKey.database)

var connection = mysql.createConnection({
    host: mySqlKey.host,
    port: mySqlKey.port,
    user: mySqlKey.user,
    password: mySqlKey.password,
    database: mySqlKey.database

});
 connection.connect(function (err, res) {
        if (err) throw err;
        console.log("Connected to " + connection.config.database);})

function startStore() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to purchase an item?",
            name: "confirm",
            default: true
        }
    ]).then(function () {
        if ("confirm") {
            buyItems()

        }
    })
}

function buyItems() {
   
inquirer.prompt([
            {
                name: "choice",
                type: "rawlist",
                choices: function () {
                    var choicesArray = [];
                    connection.query("SELECT * FROM products", function (err, res) {
                        if (err) throw err;
                        
                        for (var i = 0; i < res.length; i++) {
                            choicesArray.push(res[i].product_name);
                        }
                        console.log(choicesArray);
                        return choicesArray;
                        
                    })


                },
                message: "What item would you like to buy?"
            }
        ])}


startStore();

// buyItems();






// function test () {
//     connection.query("SELECT * FROM products", function (err, res) {
//         if (err) throw err;
//         var choiceArray = [];
//         for (var i = 0; i < res.length; i++) {
//             console.log("Item: " + res[i].product_name + "\n"+ "Price: " + res[i].price + "\n");
//         }
        
//     })}
// test();


