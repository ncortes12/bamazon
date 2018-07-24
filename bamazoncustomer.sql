DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
id INT (10) NOT NULL AUTO_INCREMENT,
product_name VARCHAR (10),
department_name VARCHAR (10),
price INT (10),
stock_quantity INT (10),
product_sales INT (10),
PRIMARY KEY (id)
);

CREATE TABLE departments (
department_id INT (10) NOT NULL AUTO_INCREMENT,
department_name VARCHAR (10),
over_head_costs INT (10),
PRIMARY KEY (department_id)
);


