const fs = require('node:fs');

const data = fs.readFileSync('input.txt', 'utf8');
const rows = data.split("\r\n");

let count = 0;
for (let record of rows) {
	let values = record.split(" ").map(i => Number(i));
	let direction = values[0] - values[1];
	let safe = true;
	for (let i=1; i < values.length; i++) {
		let delta = values[i-1] - values[i];
		let absDelta = Math.abs(delta);
		if (! (delta * direction > 0 && absDelta >= 1 && absDelta <= 3)) {
			safe = false;
			break;
		}
	}
	if (safe) count++;
}

console.log(count);