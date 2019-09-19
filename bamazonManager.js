const inquirer = require("inquirer");

const mysql = require("mysql");
const dotenv = require("dotenv").config()
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: process.env.DB_USER,
  
    // Your password
    password: process.env.DB_PASS,
    database: "bamazon_db"
});

const menuOptions = [
    {type: "list",
    message: "What would you like to do?",
    choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product", "Quit"],
    name: "pickOption"
    }
];

const addInv = [
    {type: "input",
    message: "What is the id of the item you would like to add inventory to?",
    name: "choseItem"
    },
    {type: "input",
    message: "How much would you like to add?",
    name: "addMore"
    }
];

const addProducts = [
    {type: "input",
    message: "What is the name of the product?",
    name: "name"
    },
    {type: "input",
    message: "What is the department of the product?",
    name: "department"
    },
    {type: "input",
    message: "What is the price of the product?",
    name: "price"
    },
    {type: "input",
    message: "What is the quantity of the product?",
    name: "quantity"
    }    
]

let newQuantity;
let lowStock =[];

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log("------------------");
    menuChoices();
});

function menuChoices() {
    inquirer.prompt(menuOptions).then(function(response) {
        if(response.pickOption === "View products for sale"){
            viewProducts();
        }
        else if (response.pickOption === "View low inventory") {
            lowInventory();
        }
        else if (response.pickOption === "Add to inventory") {
            addInventory();
        }
        else if (response.pickOption === "Add new product") {
            addNewProducts();
        }
        else {
            quit();
        }
    });
};

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;
       console.table(res);
        console.log("---------------------------------------------------------------------------------");
        menuChoices();
    });   
};

function lowInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;
        console.log("These are the items low in inventory:");     
        res.forEach(element => {
            if(element.stock_quantity < 5) {
                lowStock.push(element);
            }
        });
        console.table(lowStock); 
        
        console.log("---------------------------------------------------------------------------------");
        menuChoices();
    });
};

function addInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;
       console.table(res);
        console.log("---------------------------------------------------------------------------------");
        inquirer.prompt(addInv).then(function(response) {
            connection.query("SELECT * FROM products WHERE item_id=?", response.choseItem, function(err, res) {
                if (err) throw err;
                newQuantity = res[0].stock_quantity + parseInt(response.addMore);

                connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newQuantity}, {item_id: response.choseItem}], function(error) {
                    if (error) throw error;

                    console.log("----------------------------")
                    
                    menuChoices();
                });
            });
    
        });
    });
};

function addNewProducts() {
    inquirer.prompt(addProducts).then(function(response) {
        connection.query("INSERT INTO products SET ?",{product_name:response.name, department_name:response.department, price:response.price, stock_quantity:response.quantity}, function(error){
            if(error) throw error;
            console.log("Product added successfully.");
            console.log("---------------------------------");
            menuChoices();
        });
    })
}

function quit() {
    connection.end();
    process.quit;
}