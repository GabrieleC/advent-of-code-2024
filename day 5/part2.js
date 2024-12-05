const fs = require("node:fs");
const data = fs.readFileSync("input.txt", "utf-8");

const splitted = data.split("\r\n\r\n");
const rules = splitted[0].split("\r\n").map(i => i.split("|"));
const updates = splitted[1].split("\r\n").map(i => i.split(","));

let notValids = [];
for (let update of updates) {
	
	let valid = true;
	for (let idx = 0; idx < update.length; idx++) {
		const id = update[idx];
		
		const [left, right] = findRules(id);
		
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
	
	if (!valid) notValids.push(update);
}

let sum = 0;
for (let update of notValids) {
	
	update.sort((a,b) => {
		const [left, right] = findRules(a);
		if (left.includes(b)) return 1;
		if (right.includes(b)) return -1;
		return 0;
	});
	
	sum += Number(update[Math.floor(update.length / 2)]);
}

console.log(sum);


function findRules(id) {
	const right = [];
	const left = [];
	for (let rule of rules) {
		if (rule[0] == id) {
			right.push(rule[1]);
		} else if (rule[1] == id) {
			left.push(rule[0]);
		}
	}
	return [left, right];
}