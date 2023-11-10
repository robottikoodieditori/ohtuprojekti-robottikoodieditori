const users = [
    { id: 1, name: 'Alice', password: 'password123' },
    { id: 2, name: 'Bob', password: 'password456' },
    { id: 3, name: 'Charlie', password: 'password789' },
    { id: 4, name: 'Diana', password: 'password101' },
    { id: 5, name: 'Edward', password: 'password202' },
];

const logofiles = [
    { id: 1, filename: 'Report_Alice.pdf', content: 'PDF content', created: '2021-01-01', last_updated: '2021-01-02', user_id: 1 },
    { id: 2, filename: 'Image_Alice.png', content: 'Image content', created: '2021-01-03', last_updated: '2021-01-04', user_id: 1 },
    { id: 3, filename: 'Document_Bob.docx', content: 'DOCX content', created: '2021-01-05', last_updated: '2021-01-06', user_id: 2 },
    { id: 4, filename: 'Presentation_Diana.ppt', content: 'PPT content', created: '2021-02-01', last_updated: '2021-02-02', user_id: 4 },
    { id: 5, filename: 'Notes_Diana.txt', content: 'Text content', created: '2021-02-03', last_updated: '2021-02-04', user_id: 4 },
    { id: 6, filename: 'Spreadsheet_Edward.xls', content: 'Excel content', created: '2021-03-01', last_updated: '2021-03-02', user_id: 5 },
];

export { users, logofiles };
