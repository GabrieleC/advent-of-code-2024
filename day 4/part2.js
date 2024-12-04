const fs = require('node:fs');
const input = fs.readFileSync("input.txt", "utf-8").split("\r\n");

const rows = input.map(row => row.split(""));

let count = 0;
for (let row = 1; row < rows.length - 1; row++) {
	for (let col = 1; col < rows[row].length - 1; col++) {
		if (rows[row][col] == 'A') {
			if (check(row,col)) count++;
		}
	}
}
console.log(count);

function check(row, col) {
	return (
		rows[row-1][col-1] == 'M' && rows[row-1][col+1] == 'M' &&
		rows[row+1][col-1] == 'S' && rows[row+1][col+1] == 'S'
	) || (
		rows[row-1][col-1] == 'S' && rows[row-1][col+1] == 'S' &&
		rows[row+1][col-1] == 'M' && rows[row+1][col+1] == 'M'
	) || (
		rows[row-1][col-1] == 'M' && rows[row-1][col+1] == 'S' &&
		rows[row+1][col-1] == 'M' && rows[row+1][col+1] == 'S'
	) || (
		rows[row-1][col-1] == 'S' && rows[row-1][col+1] == 'M' &&
		rows[row+1][col-1] == 'S' && rows[row+1][col+1] == 'M'
	);
}