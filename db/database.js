const mysql = require('mysql2');

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
  console.log('connected as id ' + connection.threadId);
////////////////////////////////////
employeeAll();
////^^^INSERT FUNCTION HERE TO TEST^^^///
});

departmentAll = () => {
  connection.query('SELECT * FROM department', function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
};

roleAll = () => {
  connection.query('SELECT * FROM role', function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
};

employeeAll = () => {
  connection.query('SELECT a.id, a.first_name, a.last_name, CONCAT(b.first_name, " ", b.last_name) AS manager FROM employee a LEFT JOIN employee b ON a.manager_id = b.id', function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
};