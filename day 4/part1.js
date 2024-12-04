const fs = require('node:fs');
const input = fs.readFileSync("input.txt", "utf-8").split("\r\n");

const rows = input.map(row => row.split(""));
const word = ["X", "M", "A", "S"];
const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

let count = 0;
for (let row = 0; row < rows.length; row++) {
	for (let col = 0; col < rows[row].length; col++) {
		if (rows[row][col] == word[0]) {
			for (let dir of dirs) {
				if (check(row + dir[0], col + dir[1], dir, 1)) {
					count++;
				}
			}
		}
	}
}
console.log(count);

function check(row, col, dir, idx) {
	if (row < 0 || row >= rows.length || col < 0 || col >= rows[row].length) {
		return false;
	} else if (rows[row][col] != word[idx]) {
		return false;
	} else if (idx == word.length - 1) {
		return true;
	} else {
		return check(row + dir[0], col + dir[1], dir, idx + 1);
	}
}