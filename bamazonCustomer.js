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

const purchaseQuestions = [
    {type: "input",
    message: "What is the id of the item you would like to buy?",
    name: "pickItem"
    },
    {type: "input",
    message: "How many of this product would you like to buy?",
    name: "itemCount"
    }
];

let total = 0;
let newQuantity;

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log("------------------");
    bidChoices();
});

function bidChoices() {
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;
        console.table(res, ["item_id", "product_name", "price"]);
        userPrompt(); 
    })
    
    
}

function userPrompt() {
    inquirer.prompt(purchaseQuestions).then(function(response) {
        connection.query("SELECT * FROM products WHERE item_id=?", response.pickItem, function(err, res) {
            if(err) throw err;
            
            if(response.itemCount > res[0].stock_quantity) {
                console.log("Insufficient quantity! You can't purchase that many of this item!");
                quit();
            }
            else {
                total = response.itemCount * res[0].price;
                newQuantity = res[0].stock_quantity - response.itemCount;
                console.log("You can buy that!");
                console.log("The total cost of your order is: " + total + " dollars.");
                connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newQuantity}, {item_id: response.pickItem}], function(error) {
                    if (error) throw error;

                    console.log("----------------------------")
                    console.log("Your purchase was successful.");
                    quit();
                })
            }
        })
        
    })
    
}

function quit() {
    connection.end();
    process.quit;
}