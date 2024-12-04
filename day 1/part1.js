const fs = require('node:fs');

const data = fs.readFileSync('input.txt', 'utf8');
const rows = data.split("\r\n");

const left = new Array(rows.length);
const right = new Array(rows.length);

for (let record of rows) {
	let splitted = record.split("   ");
	left.push(Number(splitted[0]));
	right.push(Number(splitted[1]));
}

left.sort();
right.sort();

let sum = 0;
for (let i = 0; i < rows.length; i++) {
	sum += left[i] > right[i] ? (left[i] - right[i]) : (right[i] - left[i])
}

console.log(sum);