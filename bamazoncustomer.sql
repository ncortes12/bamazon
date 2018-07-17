DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
id INT (10) NOT NULL AUTO_INCREMENT,
product_name VARCHAR (10),
department_name VARCHAR (10),
price INT (10),
stock_quantity INT (10),
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("dog food" , "pet" , 10 , 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("dress" , "clothing" , 20, 25 );
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("pants" ,"clothing" , 25, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("leash", "pet" , 5, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("skillet" , "kitchen", 30, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("plate", "kitchen" , 2 , 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("cup" , "kitchen" , 4, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("shoes" , "clothing" , 50 , 80);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("dog bone" , "pet" , 5 , 60);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("collar" , "pet" , 5, 70);
