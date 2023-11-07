-- Insert test users
INSERT INTO users (name, password) VALUES 
('user1', '[hashed_password_1]'),
('user2', '[hashed_password_2]'),
('user3', '[hashed_password_3]');

-- Insert test logofiles
-- Assuming the IDs of users are 1, 2, and 3.
INSERT INTO logofiles (filename, content, created, last_updated, user_id) VALUES 
('logo1.png', 'Content of logo 1', '2023-01-01 10:00:00', '2023-01-01 12:00:00', 1),
('logo2.png', 'Content of logo 2', '2023-01-02 11:00:00', '2023-01-02 13:00:00', 1),
('logo3.png', 'Content of logo 3', '2023-01-03 09:00:00', '2023-01-03 10:30:00', 2),
('logo4.png', 'Content of logo 4', '2023-01-04 14:00:00', '2023-01-04 15:00:00', 3);
