var mysql = require("mysql");
var inquirer = require("inquirer");
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
    inquirer.prompt([
        {
            name: "product",
            type: "input",
            message: "What is the ID# of the product you would like to buy?"
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "How many units of the product would you like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
        .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query("SELECT * FROM products", function (err, results) {
                if (err) throw err;
                // once you have the items, prompt the user for which they'd like to purchase
                inquirer
                    .prompt([
                        {
                            name: "choice",
                            type: "input",
                            choices: function () {
                                var choiceArray = [];
                                for (var i = 0; i < results.length; i++) {
                                    choiceArray.push(results[i].item_name);
                                }
                                return choiceArray;
                            },
                            message: "What item would you like to purchase?"
                        }
                        // {
                        //   name: "purchase",
                        //   type: "input",
                        //   message: "How much would you like to bid?"
                        // }
                    ])
                    .then(function (answer) {
                        // get the information of the chosen item
                        var chosenItem;
                        for (var i = 0; i < results.length; i++) {
                            if (results[i].product_name === answer.choice) {
                                chosenItem = results[i];
                            }
                        }

                        // determine if bid was high enough
                        if (chosenItem.price < parseInt(answer.price)) {
                            // bid was high enough, so update db, let the user know, and start over
                            connection.query(
                                "UPDATE auctions SET ? WHERE ?",
                                [
                                    {
                                        price: price
                                    },
                                    {
                                        id: chosenItem.id
                                    }
                                ],
                                function (error) {
                                    if (error) throw err;
                                    console.log("Purchase was successful!");
                                    showProducts();
                                }
                            );
                        }
                        else {

                            console.log("Insufficient quantity");
                            showProducts();
                        }
                    });
            })
        });
    }


    // .then(function (res) {
    //         var merch = res.product_name,
    //         var stock_quantity2 = res.stock_quantity;

    //         conncection.query("SELECT * FROM products WHERE ?", { item_id: merch },
    //             function (err, response) {
    //                 if (err) throw err;

    //                 if (response.length === 0) {
    //                     console.log("Select Item ID");
    //                     showProducts();
    //                 } else {
    //                     var productResult = response[0];
    //                     if (stock_quantity2 <= productResult.s)
    //         }
    //             })
    //     }
// }

// function createProducts() {
//     console.log("Inserting a new product...\n");
//     var query = connection.query(
//         "INSERT INTO products SET ?",
//         {
//             product_name: "Girls Denim Jacket",
//             department_name: "Clothing",
//             price: 75,
//             stock_quantity: 8
//         },
//         function (err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + "product inserted!\n");
//             updatedProducts();
//         }
//     );
//     console.log(query.sql);
// }

// function updatedProducts() {
//     console.log("Updating all Girls Denim Jacket quantities...\n ");
//     var query = connection.query(
//         "UPDATE products SET ? WHERE ?",
//         [{ stock_quantity: 11 }, { product_name: "Girls Denim Jacket" }],
//         function (err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + "products updated!\n");
//             deleteProduct();
//         }
//     );

//     console.log(query.sql);
// }
// function deleteProduct() {
//     console.log("...\n");
//     connection.query(
//         "DELETE FROM products WHERE ?",
//         {
//             product_name: ""
//         },
//         function (err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " products deleted!\n");
//             readProducts();
//         }
//     );
// }

// function readProducts() {
//     console.log("Selecting all products...\n");
//     connection.query("SELECT * FROM products", function (err, res) {
//         if (err) throw err;
//         console.log(res);
//         connection.end();
//     });
// })