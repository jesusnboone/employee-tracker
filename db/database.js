const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Creates the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: 'root',
  // Your MySQL password
  password: '',
  database: 'employees_db'
});

connection.connect(err => {
  if (err) throw err;
////////////////////////////////////
////^^^INSERT FUNCTION HERE TO TEST^^^///
});

departmentAll = () => {
  connection.query('SELECT * FROM department', function(err, res) {
    if (err) throw err;
    console.table(res);
    connection.end();
  });
};

roleAll = () => {
  connection.query('SELECT * FROM role', function(err, res) {
    if (err) throw err;
    console.table(res);
    connection.end();
  });
};

employeeAll = () => {
  connection.query('SELECT a.id, a.first_name, a.last_name, CONCAT(b.first_name, " ", b.last_name) AS manager FROM employee a LEFT JOIN employee b ON a.manager_id = b.id', function(err, res) {
    if (err) throw err;
    console.table(res);
    connection.end();
  });
};

function menu() {

  function createManager() {
    console.log("EMPLOYEE TRACKER");
    inquirer.prompt([
      {
        type: "list",
        name: "optionSelect",
        message: "What Would You Like To Do?",
        choices: [
          "view all DEPARTMENTS",
          "view all ROLES",
          "view all EMPLOYEES",
          "add a DEPARTMENT",
          "add a ROLE",
          "add an EMPLOYEE",
          "update an EMPLOYEE ROLE"
        ]
      }
    ])
  .then(userChoice => {
    switch (userChoice.optionSelect) {
      case "view all DEPARTMENTS":
        departmentAll();
        break;
      case "view all ROLES":
        roleAll();
        break;
      case "view all EMPLOYEES":
        employeeAll();
        break;
    }
  })};
  createManager();
}

menu();
