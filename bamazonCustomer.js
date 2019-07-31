var mysql = require("mysql");

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
    createProducts();
});

function createProducts() {
    console.log("Inserting a new product...\n");
    var query = connection.query(
        "INSERT INTO products SET ?",
        {
            product_name: "Girls Denim Jacket",
            department_name: "Clothing",
            price: 75,
            stock_quantity: 8
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + "product inserted!\n");
            updatedProducts();
        }
    );
    console.log(query.sql);
}

function updatedProducts() {
    console.log("Updating all Girls Denim Jacket quantities...\n ");
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [{ stock_quantity: 11 }, { product_name: "Girls Denim Jacket" }],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + "products updated!\n");
            deleteProduct();
        }
    );

    console.log(query.sql);
}
function deleteProduct() {
    console.log("...\n");
    connection.query(
        "DELETE FROM products WHERE ?",
        {
            product_name: ""
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products deleted!\n");
            readProducts();
        }
    );
}

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}