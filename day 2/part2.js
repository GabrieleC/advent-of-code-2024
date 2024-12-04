const fs = require('node:fs');

const data = fs.readFileSync('input.txt', 'utf8');
const rows = data.split("\r\n");

let count = 0;
for (let record of rows) {
	let values = record.split(" ").map(i => Number(i));
	const reports = [values];
	for (let i=0; i < values.length; i++) {
		let report = values.slice();
		report.splice(i,1)
		reports.push(report);
	}
	
	for (report of reports) {
		if (isSafe(report)) {
			count++;
			break;
		}
	}
}

console.log(count);

function isSafe(values) {
	let direction = values[0] - values[1];
	let safe = true;
	for (let i=1; i < values.length; i++) {
		let delta = values[i-1] - values[i];
		let absDelta = Math.abs(delta);
		if (! (delta * direction > 0 && absDelta >= 1 && absDelta <= 3)) {
			return false;
		}
	}
	return true;
}