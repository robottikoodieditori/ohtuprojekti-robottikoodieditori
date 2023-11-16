const users = [
    { id: 1, name: 'Alice', password: 'password123' },
    { id: 2, name: 'Bob', password: 'password456' },
    { id: 3, name: 'Charlie', password: 'password789' },
    { id: 4, name: 'Diana', password: 'password101' },
    { id: 5, name: 'Edward', password: 'password202' },
];

const logofiles = [
    { id: 1, filename: 'TurtleDrawing_Alice.logo', content: 'FORWARD 50\nRIGHT 90\nFORWARD 50', created: '2021-01-01', last_updated: '2021-01-02', user_id: 1 },
    { id: 2, filename: 'SquareShape_Alice.logo', content: 'REPEAT 4 [FORWARD 100 RIGHT 90]', created: '2021-01-03', last_updated: '2021-01-04', user_id: 1 },
    { id: 3, filename: 'CircleDrawing_Bob.logo', content: 'REPEAT 360 [FORWARD 1 RIGHT 1]', created: '2021-01-05', last_updated: '2021-01-06', user_id: 2 },
    { id: 4, filename: 'StarPattern_Diana.logo', content: 'REPEAT 5 [FORWARD 100 RIGHT 144]', created: '2021-02-01', last_updated: '2021-02-02', user_id: 4 },
    { id: 5, filename: 'RandomLines_Diana.logo', content: 'REPEAT 10 [FORWARD RANDOM 50 RIGHT RANDOM 360]', created: '2021-02-03', last_updated: '2021-02-04', user_id: 4 },
    { id: 6, filename: 'SpiralPattern_Edward.logo', content: 'REPEAT 50 [FORWARD 5 RIGHT 20 FORWARD 5 LEFT 20]', created: '2021-03-01', last_updated: '2021-03-02', user_id: 5 },
];


export { users, logofiles };
