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

function startProgram() {
    inquirer.prompt({
        name: "choose",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View my products for sale",
            "View low inventory items",
            "Add stock to inventory",
            "Create a new product",
            "I'm done!"
        ]
    })
        .then(function (answer) {
            switch (answer.choose) {
                case "View my products for sale":
                    productView();
                    break;

                case "View low inventory items":
                    lowInventory();
                    break;

                case "Add stock to inventory":
                    addStock();
                    break;

                case "Create a new product":
                    newProduct();
                    break;
                case "I'm done!":
                    connection.end();
            }
        })

}


function productView() {
    console.log("working");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("Items available for purchase ")
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].id + "|" + "Item: " + res[i].product_name + "|" + "Department: " + res[i].department_name + "|" + "Price: $" + res[i].price + "|" + "Quantity Available: " + res[i].stock_quantity + "\n");
        }
        startProgram();
    })
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function (err, res) {
        // console.log(res)
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].id + "|" + "Item: " + res[i].product_name + "|" + "Department: " + res[i].department_name + "|" + "Price: $" + res[i].price + "|" + "Quantity Available: " + res[i].stock_quantity + "\n");
        }

        startProgram();
    })
}

function addStock() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;


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
                message: "Which item's inventory would you like to increase?"
            },
            {
                type: "input",
                message: "How many would you like to add?",
                name: "quantity"
            }

        ]).then(function (answer) {
            connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: answer.quantity },
            {
                product_name: answer.choice
            }], function (err, res) {
                if (err) throw err;
                console.log("You added " + answer.quantity + " to " + answer.choice);
                startProgram();
            })


        })
    })

}

function newProduct(){
    inquirer.prompt([
        {type: "input",
        message: "What is the product name you would like to add?",
        name: "product"
    },
    {
        type:"list",
        message: "What department does this item belong in?",
        choices: [
            "pet",
            "clothing",
            "kitchen"
        ],
        name: "department"
    },
    {
        type:"input",
        message:"How much does this product cost? Please enter only numbers.",
        name: "price"

    },
    {
        type:"input",
        message: "How many of these do you have? Please enter only numbers.",
        name: "stock"
    }
    ]).then(function(answer){
        connection.query("INSERT INTO products SET ?",{
            product_name:answer.product,
            department_name:answer.department,
            price:answer.price,
            stock_quantity:answer.stock

        })
        startProgram();

    })
}

