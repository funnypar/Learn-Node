const fs = require('fs');

// Read data from the file

const file = fs.readFileSync('./test.txt', 'utf-8');
console.log(file);

// Write a file

const newText = `Here is an update for text : ${file}`;
fs.writeFileSync('./outPut.txt', newText);