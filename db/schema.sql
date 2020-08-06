DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

DROP TABLE IF EXISTS Department;
DROP TABLE IF EXISTS Role;
DROP TABLE IF EXISTS Employee;

CREATE TABLE Department(
    id INT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE Role(
    id INT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES Department(id) ON DELETE SET NULL
);

CREATE TABLE Employee(
    id INT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES Role(id) ON DELETE SET NULL
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES Role(title) ON DELETE SET NULL
);