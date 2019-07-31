DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("full lace wig", "beauty", 250, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("flat iron", "beauty", 100, 25);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("book bag", "school supply", 25, 15);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("game console", "electronic", 150, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("printer", "electronic", 80, 12);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("10pk gel pens", "school supply", 2.99, 30);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("hair bow", "beauty", 2.00, 25);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("karaoke machine", "electronic", 49.99, 7);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("bed in a bag", "home good", 80, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("beach towel", "home good", 7.50, 12);