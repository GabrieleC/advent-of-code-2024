const fs = require('node:fs');
const rows = fs.readFileSync('input.txt', 'utf8').split("\r\n");

let sum = 0;
for (let row of rows) {
	let start = -1;
	do {
		start = row.indexOf("mul(", start + 1);
		if (start == -1) break;
		let end = row.indexOf(")", start);
		if (end == -1) break;
		let values = row.substring(start + 4, end).split(",");
		if (values.length != 2) continue;
		let left = Number(values[0]);
		let right = Number(values[1]);
		if (!isFinite(left) || !isFinite(right)) continue;
		sum += left * right;
	} while (start != -1);
}

console.log(sum);