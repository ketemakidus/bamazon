var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({

  host: "localhost",

  port: 3306,

  user: "root",

  password: "Ketemasama22",

  database: "bamazon"

});

function afterConnection() {

  queryStr = 'SELECT * FROM products';

  connection.query('SELECT * FROM products', (err, res) => {
    if (err) throw err;

    console.log('PRODUCT IN STOCK');
    console.log('...................\n');
    console.log(res);
  })
}

function validateInput(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && (sign === 1)) {
    return true;
  } else {
    return 'Please enter a non-zero number.';
  }
}

function promptUserPurchase() {

  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Please enter the Item ID which you would like to purchase.',
      validate: validateInput,
      filter: Number
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many do you need?',
      validate: validateInput,
      filter: Number
    }
  ]).then(function (input) {

    var item = input.id;
    var quantity = input.quantity;

    var queryStr = 'SELECT * FROM products WHERE ?';

    connection.query(queryStr, { id: item }, function (err, data) {
      if (err) throw err;



      if (data.length === 0) {
        console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
        displayInventory();
      } else {
        var productData = data[0];


        if (quantity <= productData.stock_quantity) {
          console.log('Congratulations');

          var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE id = ' + item;

          connection.query(updateQueryStr, function (err, data) {
            if (err) throw err;

            console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
            console.log('Thank you for shopping!');
            connection.end();
          })
        } else {
          console.log('Sorry, there is not enough product in stock,');
          displayInventory();
        }
      }
    })
  })
}
function runBamazon() {
  promptUserPurchase();

  afterConnection();
}

runBamazon();
