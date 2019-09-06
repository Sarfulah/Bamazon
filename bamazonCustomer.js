var mysql = require("mysql");
var inquirer = require("inquirer");

//  Connect to SQL Database
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Savannah2009",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    showProducts();
});

function showProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        for (var i = 0; i < results.length; i++) {
            console.log("\nItem ID: " + results[i].item_id + " | " + "Product Name: " + results[i].product_name + " | " + "Stock Quantity: " + results[i].stock_quantity)
        }
        productInfo();
    });

}

// Item ID selection and Quantity amount
function productInfo() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "product",
                type: "input",
                message: "What is the ID# of the product you would like to buy?",
                validate: function (value) {
                    if (!isNaN(value) && value < 11) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "stock_quantity",
                type: "input",
                message: "How many units of the product would you like to buy?",
                validate: function (value) {
                    if (!isNaN(value)) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (answer) {

            var chosenItem = answer.id;
            console.log("Chosen item id: ", chosenItem);

            var userQ = answer.quantity;
            console.log("Chosen quantity from stock: ", userQ, "\n");

            // Find stock quantity, and decline is input is greater then stock amount 
            
            connection.query("SELECT * FROM products", [{ item_id: answer.id }], function (err, results) {
                
                if (err) throw err;
                // console.log(results);
                if (results[0].stock_quantity - userQ >=0){
                
                }
                console.table(results);
                var currQuan = results[0].stock_quantity;
                console.log("Item quantity in stock: ", currQuan);
                var price = results[0].price;
                var remainQ = currQuan - answer.quantity;
                console.log("Remaining Quantity: ", remainQ);

                if (currQuan > answer.quantity) {
                    console.log("Amount Remaining: " + remainQ);
                    console.log("Total Purchase Cost: " + (answer.quantity * price));

                    connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?",
                    [
                        remainQ, answer.id
                    ],

                    function (err, results) {
                        console.table(results);
                    });

                    connection.query("SELECT * FROM products", function (err, results) {
                        console.log("Updated quantity: ");
                        console.table(results);
                    });

                } else {
                    console.log("Insufficient Quantity. Please update.");
                }

                connection.end();
            });

        });

    });
}