const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8');

const ops = [];

{
	let start = -1;
	do {
		start = data.indexOf("mul(", start + 1);
		if (start == -1) break;
		let end = data.indexOf(")", start);
		if (end == -1) break;
		let values = data.substring(start + 4, end).split(",");
		if (values.length != 2) continue;
		let left = Number(values[0]);
		let right = Number(values[1]);
		if (!isFinite(left) || !isFinite(right)) continue;
		ops.push({index: start, value: left * right});
	} while (start != -1);
}

{
	let start = -1;
	do {
		start = data.indexOf("don't()", start + 1);
		if (start > -1) ops.push({index: start, value: false});
	} while (start != -1);
}

{
	let start = -1;
	do {
		start = data.indexOf("do()", start + 1);
		if (start > -1) ops.push({index: start, value: true});
	} while (start != -1);
}

ops.sort((a,b) => a.index - b.index);

console.log(ops);

let sum = 0;
let enabled = true;
for (op of ops) {
	if (op.value === true) {
		enabled = true;
	} else if (op.value === false) {
		enabled = false;
	} else if (enabled) {
		sum += op.value;
	}
}

console.log(sum);