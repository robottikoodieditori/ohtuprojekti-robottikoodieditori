const users = [
    { id: 1, name: 'Alice', password: 'password123' },
    { id: 2, name: 'Bob', password: 'password456' },
    { id: 3, name: 'Charlie', password: 'password789' },
    { id: 4, name: 'Diana', password: 'password101' },
    { id: 5, name: 'Edward', password: 'password202' },
    { id: 6, name: 'Frank', password: 'password303' },
    { id: 7, name: 'Georgia', password: 'password404' },
    { id: 8, name: 'Henry', password: 'password505' },
];

const logofiles = [
    { id: 1, filename: 'TurtleDrawing_Alice.logo', content: 'FORWARD 50\nRIGHT 90\nFORWARD 50', created: '2021-01-01', last_updated: '2021-01-02', user_id: 1 },
    { id: 2, filename: 'SquareShape_Alice.logo', content: 'REPEAT 4 [FORWARD 100 RIGHT 90]', created: '2021-01-03', last_updated: '2021-01-04', user_id: 1 },
    { id: 3, filename: 'CircleDrawing_Bob.logo', content: 'REPEAT 360 [FORWARD 1 RIGHT 1]', created: '2021-01-05', last_updated: '2021-01-06', user_id: 2 },
    { id: 4, filename: 'StarPattern_Diana.logo', content: 'REPEAT 5 [FORWARD 100 RIGHT 144]', created: '2021-02-01', last_updated: '2021-02-02', user_id: 4 },
    { id: 5, filename: 'RandomLines_Diana.logo', content: 'REPEAT 10 [FORWARD RANDOM 50 RIGHT RANDOM 360]', created: '2021-02-03', last_updated: '2021-02-04', user_id: 4 },
    { id: 6, filename: 'SpiralPattern_Edward.logo', content: 'REPEAT 50 [FORWARD 5 RIGHT 20 FORWARD 5 LEFT 20]', created: '2021-03-01', last_updated: '2021-03-02', user_id: 5 },
    { id: 7, filename: 'HexagonPattern_Frank.logo', content: 'REPEAT 6 [FORWARD 100 RIGHT 60]', created: '2021-03-03', last_updated: '2021-03-04', user_id: 6 },
    { id: 8, filename: 'FlowerPattern_Georgia.logo', content: 'REPEAT 12 [FORWARD 30 RIGHT 30 FORWARD 30 LEFT 30]', created: '2021-03-05', last_updated: '2021-03-06', user_id: 7 },
    { id: 9, filename: 'Zigzag_Henry.logo', content: 'REPEAT 10 [FORWARD 80 RIGHT 45 FORWARD 80 LEFT 45]', created: '2021-03-07', last_updated: '2021-03-08', user_id: 8 },
    { id: 10, filename: 'AbstractShape_Alice.logo', content: 'REPEAT 8 [FORWARD 70 RIGHT 45]', created: '2021-03-09', last_updated: '2021-03-10', user_id: 1 },
    { id: 11, filename: 'Sunset_Bob.logo', content: 'REPEAT 18 [FORWARD 90 RIGHT 20]', created: '2021-03-11', last_updated: '2021-03-12', user_id: 2 },
    { id: 12, filename: 'MountainRange_Charlie.logo', content: 'REPEAT 12 [FORWARD 100 RIGHT 30 FORWARD 100 LEFT 30]', created: '2021-03-13', last_updated: '2021-03-14', user_id: 3 },
    { id: 13, filename: 'OceanWave_Diana.logo', content: 'REPEAT 15 [FORWARD 80 RIGHT 24]', created: '2021-03-15', last_updated: '2021-03-16', user_id: 4 },
    { id: 14, filename: 'CitySkyline_Edward.logo', content: 'REPEAT 5 [FORWARD 120 RIGHT 74]', created: '2021-03-17', last_updated: '2021-03-18', user_id: 5 },
    { id: 15, filename: 'Valley_Frank.logo', content: 'REPEAT 20 [FORWARD 50 RIGHT 18]', created: '2021-03-19', last_updated: '2021-03-20', user_id: 6 },
    { id: 16, filename: 'RiverBend_Georgia.logo', content: 'REPEAT 10 [FORWARD 100 RIGHT 36]', created: '2021-03-21', last_updated: '2021-03-22', user_id: 7 },
    { id: 17, filename: 'Hillside_Henry.logo', content: 'REPEAT 14 [FORWARD 60 RIGHT 26]', created: '2021-03-23', last_updated: '2021-03-24', user_id: 8 },
    { id: 18, filename: 'StarField_Alice.logo', content: 'REPEAT 50 [FORWARD 20 RIGHT 15]', created: '2021-03-25', last_updated: '2021-03-26', user_id: 1 },
    { id: 19, filename: 'MoonCrescent_Bob.logo', content: 'REPEAT 28 [FORWARD 40 RIGHT 13]', created: '2021-03-27', last_updated: '2021-03-28', user_id: 2 },
];

export { users, logofiles };
