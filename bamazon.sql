DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(10, 2),
    stock_quantity INT(10),
    PRIMARY KEY (item_id)
    );
    
    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Barbara Streisand Record", "Entertainment", 10.00, 3), ("Crazy Lady's Bathwater", "Miscellaneous", 20.00, 1), ("Jumbo Firework Set", "Entertainment", 5.00, 2);
    
    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Student Tears", "Miscellaneous", 100.00, 4), ("Ichiraku Ramen Pork Bowl", "Food", 7.00, 5), ("Carolina Reaper Pepper", "Food", 90.00, 4), ("Mini Flamethrower", "Miscellaneous", 150.00, 2);
    
    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("MJOLNIR", "Miscellaneous", 1000.00, 1), ("Gobblet of Fire", "Entertainment", 80.00, 1), ("Popeye's Chicken Sandwich", "Food", 6.00, 20);