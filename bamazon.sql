DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(10) NOT NULL,
  price CHAR(50) NOT null,
  stock_quantity CHAR(50) NOT null,
  PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity )VALUES 
("monitor","hardware" , 500, 18),
("CPU","hardware" , 400, 20),
("Keyboard","hardware" , 100, 20),
("mouse","hardware" , 50, 20),
("Headphones","hardware" , 60, 18),
("smartphones","hardware" , 600, 19),
("RAM","hardware" , 200, 16),
("Harddisk","hardware" , 300, 18);

