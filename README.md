# Bamazon
The Bamazon marketplace is a node program that allows the user to purchase products if their is enough product in stock. 
If there is enough product, the marketplace program will calculate your total for the purchase.

## Purpose
Bamazon is a real world application that is useful since there are so many other marketplaces in existence. This project is a basic example of user interaction with the front end of an application and a company's backend program interacting with the marketplace's database to check the stock of a product and update it as purchases are made. 

## Using Bamazon
In order to test Bamazon out, it needs to be run as a node application through the command line. 

## Examples of App 

### Running bamazonCustomer.js
* The program will display the items for sale in the market and prompt the user which they would like to purchase and how much. Once the user enters that information, the total price of the purchase is calculated and displayed for the user before the program stops.
![Picture of customer purchase](/images/customer.PNG)

### Running bamazonManager.js
* There are two ways to view inventory: You can view the entire inventory or you can view the items that are low in supply. Low supply items are inventory that is under 5, and the program prompts you to choose one of these choices from a list.
![Picture of viewing inventory](/images/viewinventory.PNG)

* In the list of options given to the manager, the program also allows the user to add supplies to the already existing inventory. The user can choose which product to add to and how much before the program exits. To check for inventory changes, select view inventory from the menu after.
![Picture of adding inventory](/images/addinventory.PNG)

* The manager can also add a new product to the market. The program will then prompt the user to enter the name of the product, the department, the price, and the initial inventory of the item. To check for inventory changes, select view inventory from the menu after.
![Picture of adding a new product](/images/adproduct.PNG)

* The user has the option to quit at any time.


## Programs Used
* Javascript
* Node
* JSON
* Inquirer NPM
* MySQL
* MySQL NPM