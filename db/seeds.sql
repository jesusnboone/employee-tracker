INSERT INTO Department (name)
VALUES
('Cultivation'),
('Distribution'),
('Packaging'),
('Trimming');

INSERT INTO Role (title, salary, department_id)
VALUES
('Cultivator', '35000', 1),
('Lead Cultivator', '45000', 1),
('Cultivation Manager', '60000', 1),
('Distributor', '40000', 2),
('Distribution Manager', '50000', 2),
('Packager', '30000', 3),
('Packaging Lead', '35000', 3),
('Packaging Manager', '45000', 3),
('Trimmer', '30000', 4),
('Trim Lead', '35000', 4),
('Trim Manager', '45000', 4);

INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'McMahon', 1, 3),
('William', 'Adams', 2, 3),
('Kelley', 'Roberts', 3, NULL),
('Michael', 'Jones', 4, 5),
('Ben', 'Scott', 5, NULL),
('Samantha', 'Jameson', 6, 8),
('Angel', 'Ramirez', 7, 8),
('Josh', 'Griffiths', 8, NULL),
('Jacob', 'Peterson', 9, 11),
('Caitlin', 'Richards', 10, 11),
('Devon', 'Devine', 11, NULL);

