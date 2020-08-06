INSERT INTO Department (name)
VALUES
('Cultivation'),
('Distribution'),
('Packaging'),
('Trimming');

INSERT INTO Role (title, salary, department_id)
VALUES
('Cultivator', '$35k', 1),
('Lead Cultivator', '$45k', 1),
('Cultivation Manager', '$60k', 1),
('Distributor', '$40k', 2),
('Distribution Manager', '$50k', 2),
('Packager', '$30k', 3),
('Packaging Lead', '$35k', 3),
('Packaging Manager', '$45k', 3),
('Trimmer', '$30k', 4),
('Trim Lead', '$35k', 4),
('Trim Manager', '$45k', 4);

INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'McMahon', 1, 3),
('William', 'Adams', 2, 3),
('Kelley', 'Roberts', 3),
('Michael', 'Jones', 4, 5),
('Ben', 'Scott', 5),
('Samantha', 'Jameson', 6, 8),
('Angel', 'Ramirez', 7, 8),
('Josh', 'Griffiths', 8),
('Jacob', 'Peterson', 9, 11),
('Caitlin', 'Richards', 10, 11),
('Devon', 'Devine', 11);

