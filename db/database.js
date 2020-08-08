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

function tracker() {

  function menu() {
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
      case "add a DEPARTMENT":
        addDepartment();
        break;
      case "add a ROLE":
        addRole();
        break;

    }
  })};

  function addDepartment() {
    inquirer.prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the name of this department?"
      }
    ])
    .then(answers => {
      console.log(answers.departmentName);
      newDepartment = () => {
        connection.query("INSERT INTO department (name) VALUES ('" + answers.departmentName + "')", function(err, res) {
          if (err) throw err;
          departmentAll();
          connection.end();
        });
      };
      newDepartment();
    })
  }

  function addRole() {
    departmentName = () => {
      connection.query('SELECT name FROM department', function(err, res) {
        if (err) throw err;
        var deptArray = []
        console.log(res);
        for (i = 0; i < res.length; i++){
          deptArray.push(res[i].name);
        }
        console.log(deptArray);
    inquirer.prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "What is the title of this role?"
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What is the salary of this role?"
      },
      {
        type: "list",
        name: "roleDepartment",
        message: "What is the department for this role?",
        choices: deptArray
      }
    ])
    
    .then(answers => {
      console.log(answers.roleTitle);
      console.log(answers.roleSalary);
      console.log(answers.roleDepartment);
      newRole = () => {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES ('" + answers.roleTitle + "','" + answers.roleSalary + "','" + answers.roleDepartment + "') WHERE department_id = department.name", function(err, res) {
          if (err) throw err;
          roleAll();
          connection.end();
        });
      };
      newRole();
      
    })
    
  });}
  departmentName();
};

  menu();
}

tracker();
