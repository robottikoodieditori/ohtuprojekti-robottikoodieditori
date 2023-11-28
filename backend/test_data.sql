-- Insert test users
INSERT INTO users (id, name, password) VALUES
    (1, 'Alice', 'password123'),
    (2, 'Bob', 'password456'),
    (3, 'Charlie', 'password789'),
    (4, 'Diana', 'password101'),
    (5, 'Edward', 'password202'),
    (6, 'Frank', 'password303'),
    (7, 'Georgia', 'password404'),
    (8, 'Henry', 'password505');

-- Insert data into the logofiles table
INSERT INTO logofiles (id, filename, content, created, last_updated, user_id, visible) VALUES
    (1, 'TurtleDrawing_Alice.logo', 'FORWARD 50\nRIGHT 90\nFORWARD 50', '2021-01-01', '2021-01-02', 1, 0),
    (2, 'SquareShape_Alice.logo', 'REPEAT 4 [FORWARD 100 RIGHT 90]', '2021-01-03', '2021-01-04', 1, 1),
    (3, 'CircleDrawing_Bob.logo', 'REPEAT 360 [FORWARD 1 RIGHT 1]', '2021-01-05', '2021-01-06', 2, 0),
    (4, 'StarPattern_Diana.logo', 'REPEAT 5 [FORWARD 100 RIGHT 144]', '2021-02-01', '2021-02-02', 4, 1),
    (5, 'RandomLines_Diana.logo', 'REPEAT 10 [FORWARD RANDOM 50 RIGHT RANDOM 360]', '2021-02-03', '2021-02-04', 4, 0),
    (6, 'SpiralPattern_Edward.logo', 'REPEAT 50 [FORWARD 5 RIGHT 20 FORWARD 5 LEFT 20]', '2021-03-01', '2021-03-02', 5, 1),
    (7, 'HexagonPattern_Frank.logo', 'REPEAT 6 [FORWARD 100 RIGHT 60]', '2021-03-03', '2021-03-04', 6, 0),
    (8, 'FlowerPattern_Georgia.logo', 'REPEAT 12 [FORWARD 30 RIGHT 30 FORWARD 30 LEFT 30]', '2021-03-05', '2021-03-06', 7, 1),
    (9, 'Zigzag_Henry.logo', 'REPEAT 10 [FORWARD 80 RIGHT 45 FORWARD 80 LEFT 45]', '2021-03-07', '2021-03-08', 8, 0),
    (10, 'AbstractShape_Alice.logo', 'REPEAT 8 [FORWARD 70 RIGHT 45]', '2021-03-09', '2021-03-10', 1, 1),
    (11, 'Sunset_Bob.logo', 'REPEAT 18 [FORWARD 90 RIGHT 20]', '2021-03-11', '2021-03-12', 2, 0),
    (12, 'MountainRange_Charlie.logo', 'REPEAT 12 [FORWARD 100 RIGHT 30 FORWARD 100 LEFT 30]', '2021-03-13', '2021-03-14', 3, 1),
    (13, 'OceanWave_Diana.logo', 'REPEAT 15 [FORWARD 80 RIGHT 24]', '2021-03-15', '2021-03-16', 4, 0),
    (14, 'CitySkyline_Edward.logo', 'REPEAT 5 [FORWARD 120 RIGHT 74]', '2021-03-17', '2021-03-18', 5, 1),
    (15, 'Valley_Frank.logo', 'REPEAT 20 [FORWARD 50 RIGHT 18]', '2021-03-19', '2021-03-20', 6, 0),
    (16, 'RiverBend_Georgia.logo', 'REPEAT 10 [FORWARD 100 RIGHT 36]', '2021-03-21', '2021-03-22', 7, 1),
    (17, 'Hillside_Henry.logo', 'REPEAT 14 [FORWARD 60 RIGHT 26]', '2021-03-23', '2021-03-24', 8, 0),
    (18, 'StarField_Alice.logo', 'REPEAT 50 [FORWARD 20 RIGHT 15]', '2021-03-25', '2021-03-26', 1, 1),
    (19, 'MoonCrescent_Bob.logo', 'REPEAT 28 [FORWARD 40 RIGHT 13]', '2021-03-27', '2021-03-28', 2, 0);
