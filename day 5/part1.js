const fs = require("node:fs");
const data = fs.readFileSync("input.txt", "utf-8");

const splitted = data.split("\r\n\r\n");
const rules = splitted[0].split("\r\n").map(i => i.split("|"));
const updates = splitted[1].split("\r\n").map(i => i.split(","));

let valids = [];
for (let update of updates) {
	
	let valid = true;
	for (let idx = 0; idx < update.length; idx++) {
		const id = update[idx];
		
		const right = [];
		const left = [];
		for (let rule of rules) {
			if (rule[0] == id) {
				right.push(rule[1]);
			} else if (rule[1] == id) {
				left.push(rule[0]);
			}
		}
		
		for (let i = idx; i >= 0; i--) {
			if (right.includes(update[i])) {
				valid = false;
				break;
			}
		}
		for (let i = idx; i < update.length; i++) {
			if (left.includes(update[i])) {
				valid = false;
				break;
			}
		}
	}
	
	if (valid) valids.push(update);
}

let sum = 0;
for (let valid of valids) {
	sum += Number(valid[Math.floor(valid.length / 2)]);
}

console.log(sum);