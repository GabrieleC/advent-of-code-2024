import * as fs from "node:fs";
const data = fs.readFileSync("input.txt", "utf-8");
const rows = data.split("\r\n");

const PLUS = 0;
const MULT = 1;
const CONC = 2;

let sum = 0;
for (let row of rows) {
	const splittedRow = row.split(": ");
	const testValue = Number(splittedRow[0]);
	const values = splittedRow[1].split(" ").map(e => Number(e));
	
	const ops = new Array(values.length - 1);
	ops.fill(PLUS);
	
	while (true) {
		
		//console.log("testing " + row + " with " + ops);
		
		let res = values[0];
		for (let i = 1; i < values.length; i++) {
			const op = ops[i - 1];
			if (op == PLUS) {
				res += values[i];
			} else if (op == MULT) {
				res *= values[i];
			} else {
				res = Number(String(res) + String(values[i]));
			}
		}
		
		if (res == testValue) {
			sum += testValue;
			break;
		}
		
		if (!addOne(ops)) {
			break;
		}
	}
}

console.log(sum);

function addOne(ops, pos = 0) {
		ops[pos]++;
		if (ops[pos] > CONC) {
			if (pos == ops.length - 1) return false;
			ops[pos] = 0;
			return addOne(ops, pos + 1);
		}
		return true;
}