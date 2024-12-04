const fs = require('node:fs');

const data = fs.readFileSync('input.txt', 'utf8');
const rows = data.split("\r\n");

const left = new Array();
const right = new Array();

for (let record of rows) {
	let splitted = record.split("   ");
	left.push(Number(splitted[0]));
	right.push(Number(splitted[1]));
}

let score = 0;
for (let item of left) {
	
	let count = 0;
	for (let itemRight of right) {
		if (itemRight == item) count++;
	}
	
	score += (item * count);
}

console.log(score);