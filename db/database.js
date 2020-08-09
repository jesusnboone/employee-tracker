  
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
      case "add an EMPLOYEE":
        addEmployee();
        break;
      case "update an EMPLOYEE ROLE":
        updateEmployee();
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
        for (i = 0; i < res.length; i++){
          deptArray.push(res[i].name);
        }
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
      getDeptId = () => {
        connection.query("SELECT (id) FROM department WHERE department.name = ('" + answers.roleDepartment + "')", function(err, res) {
          if (err) throw err;
          let deptId = []
          deptId.push(res[0].id);
        
        connection.query("INSERT INTO role (title, salary, department_id) VALUES ('" + answers.roleTitle + "','" + answers.roleSalary + "','" + deptId[0] + "')", function(err, res) {
          if (err) throw err;
          roleAll();
          connection.end();
        })})
      }
      getDeptId();
    })
    
    });}
    departmentName();
  };

  function addEmployee() {
    roleCall = () => {
      connection.query('SELECT title FROM role', function(err, res) {
        if (err) throw err;
        var roleArray = []
        for (i = 0; i < res.length; i++){
          roleArray.push(res[i].title);
        }
      connection.query('SELECT first_name FROM employee WHERE employee.manager_id IS NULL', function(err, res) {
          if (err) throw err;
          var managerArray = []
          for (i = 0; i < res.length; i++){
            managerArray.push(res[i].first_name);
          }
    inquirer.prompt([
      {
        type: "input",
        name: "employeeFirstName",
        message: "What is the first name of this employee?"
      },
      {
        type: "input",
        name: "employeeLastName",
        message: "What is the last name of this employee?"
      },
      {
        type: "list",
        name: "roleTitle",
        message: "What is the role title for this employee?",
        choices: roleArray
      }
    ])
    
    .then(answers => {
      newEmployee = () => {
        connection.query("SELECT (id) FROM role WHERE role.title = ('" + answers.roleTitle + "')", function(err, res) {
          if (err) throw err;
          let roleId = []
          roleId.push(res[0].id);
        
        connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES ('" + answers.employeeFirstName + "','" + answers.employeeLastName + "','" + roleId[0] + "')", function(err, res) {
          if (err) throw err;
          employeeAll();
        })})
      }
      newEmployee();
    })
    
    })})}
    roleCall();
  };

  function updateEmployee() {
    getEmployee = () => {
      connection.query('SELECT title FROM role', function(err, res) {
        if (err) throw err;
        var roleArray = []
        for (i = 0; i < res.length; i++){
          roleArray.push(res[i].title);
        }
      connection.query('SELECT first_name FROM employee', function(err, res) {
          if (err) throw err;
          var employeeArray = []
          for (i = 0; i < res.length; i++){
            employeeArray.push(res[i].first_name);
          }
    inquirer.prompt([
      {
        type: "list",
        name: "employeeName",
        message: "What is the name of this employee?",
        choices: employeeArray
      },
      {
        type: "list",
        name: "newRole",
        message: "What is the new role of this employee?",
        choices: roleArray
      }
    ])
    
    .then(answers => {
      updateRole = () => {
        connection.query("SELECT (id) FROM role WHERE title = ('" + answers.newRole + "')", function(err, res) {
          if (err) throw err;
          let roleId = []
          roleId.push(res[0].id);
            
          connection.query("SELECT (id) FROM employee WHERE first_name = ('" + answers.employeeName + "')", function(err, res) {
            if (err) throw err;
            let employeeId = []
            employeeId.push(res[0].id);
        
        connection.query("UPDATE employee SET role_id = '" + roleId[0] + "' WHERE id = " + employeeId[0]), function(err, res) {
          if (err) throw err;
          employeeAll();
        }})})

        connection.query('SELECT a.id, a.first_name, a.last_name, CONCAT(b.first_name, " ", b.last_name) AS manager FROM employee a LEFT JOIN employee b ON a.manager_id = b.id', function(err, res) {
          if (err) throw err;
          console.table(res);
          connection.end();

        
      })}
      updateRole();
    })
    
    })})}
    getEmployee();
  };

  menu();
}

tracker();