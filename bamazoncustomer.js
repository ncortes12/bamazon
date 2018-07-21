require("dotenv").config();
var keys = require('./keys.js');
var mysql = require('mysql');
var inquirer = require('inquirer');
var mySqlKey = keys.mySQL
var newQuantity = 0;
var cost = 0;

console.log(mySqlKey.host, mySqlKey.port, mySqlKey.user, mySqlKey.password, mySqlKey.database)

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
    startStore();
})

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
            chooseItems()

        }
    })
}

function chooseItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("Items available for purchase ")
        for (var i = 0; i < res.length; i++) {
            console.log("Item: " + res[i].product_name + "|" + "Price: $" + res[i].price + "|" + "Quantity Available: " + res[i].stock_quantity);
        }


        inquirer.prompt([
            {
                name: "choice",
                type: "list",
                choices: function () {
                    var choicesArray = [];
                    for (var i = 0; i < res.length; i++) {
                        choicesArray.push(res[i].product_name);

                    }
                    // console.log(choicesArray);
                    return choicesArray;
                },
                message: "What item would you like to buy?"
            },
            {
                type: "input",
                message: "How many would you like?",
                name: "quantity"
            }

        ]).then(function (answer) {
            // console.log(answer);
            connection.query("SELECT * FROM products WHERE ?", { product_name: answer.choice }, function (err, res) {
                if (err) throw err;
                // console.log(res);
                // console.log(answer);
                if (answer.quantity <= res[0].stock_quantity) {
                    var numberChoice = Number(answer.quantity)
                    // console.log(numberChoice);
                    cost = numberChoice * res[0].price;
                    newQuantity = res[0].stock_quantity - numberChoice;

                    //   var check =  typeof(newQuantity);
                    //   var check2 = typeof(numberChoice);
                    //   console.log(check, check2);
                    //   console.log(newQuantity)
                    // console.log(newQuantity);
                    updateInventory(answer);
                }
                else {
                    console.log("Sorry we don't have enough!")
                    startStore();
                }
            })

        })
    }
    )
}

function updateInventory(answer) {
    // console.log(answer);


    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newQuantity
            },
            {
                product_name: answer.choice
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log("You just bought a bunch of neat stuff! Your total is $"+ cost + ". Have a nice day");
            startStore();
        })

}









// function test () {
//     connection.query("SELECT * FROM products", function (err, res) {
//         if (err) throw err;
//         var choiceArray = [];
//         for (var i = 0; i < res.length; i++) {
//             console.log("Item: " + res[i].product_name + "\n"+ "Price: " + res[i].price + "\n");
//         }

//     })}
// test();


