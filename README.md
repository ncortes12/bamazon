# bamazon
A node command line app that allows you to purchase products as a customer or update inventory, add products and view low stock as a manager.



## Usage


TO use the app clone the repository, run an npm install to install all dependencies. Then run either `bamazoncustomer.js` or `bamazonmanager.js` in your command terminal using node.

## Requirements
- Schema.sql and seeds.sql files to set up a MySQL database
- Database containing items with a product name, department, price, stock quantity and a unique ID that auto_increments
- Use `mysql` and `inquirer` npm packages in the `bamazoncustomer.js` and `bamazonmanager.js` file
- Separate JavaScript files for customers and managers used to connect to , extract data from and update a MySQL database
- Separate file for storing database connection information (`key.js`)


## Technologies Utilized

- JavaScript
- MySQL
- node.js


## Code Explanation
- My `bamazoncustomer.js` and `bamazonmanager.js` files sets up a connection to the same  MySQL database. 
- In `bamazoncustomer.js` using `inquirer` you will be taken through a series of prompts to select and purchase an available item. Once you purchase and item it will alert you of your total price, subtract the quantity purchased from the inventory and then take you back to the intial prompt to purchase and item or exit the app.
- In `bamazonmanager.js` using inquirer you will be given a list to choose which funtion you would like to access, either view products for sale, view low inventory items, add stock to inventory, create a new product or exiting the app. The view products for sale function displays all products in the database.  The view low stock items displays all items with stock quantiies under 5. The add stock to inventory intakes a quantity and adds it to the stock quantity in the database. Finnaly the create new product function intakes a product name, department, price and stock quantity and insert a new item into the database.
