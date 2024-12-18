import * as fs from "node:fs";

const data = fs.readFileSync("input.txt", "utf-8");
const rows = data.split("\r\n");

let regA = rows[0].split(": ")[1];
let regB = rows[1].split(": ")[1];
let regC = rows[2].split(": ")[1];
const program = rows[4].split(": ")[1].split(",");
let ip = 0;
let output = [];

while(ip < program.length) {
	const op = Number(program[ip]);
	const opv = Number(program[ip + 1]);
	const val = decodeValue(op, opv);
	
	execute(op, val);
}

console.log(output.join(","));

function execute(op, val) {
	ip += 2;
	
	if (op === 0) {
		regA = Math.floor(regA / Math.pow(2, val));
	} else if (op === 1) {
		regB = regB ^ val;
	} else if (op === 2) {
		regB = val % 8;
	} else if (op === 3) {
		if (regA != 0) ip = val;
	} else if (op === 4) {
		regB = regB ^ regC;
	} else if (op === 5) {
		output.push(val % 8);
	} else if (op === 6) {
		regB = Math.floor(regA / Math.pow(2, val));
	} else if (op === 7) {
		regC = Math.floor(regA / Math.pow(2, val));
	}
}

function decodeValue(op, opv) {
	if ([1,3,4].includes(op)) {
		return opv;
	} else {
		if (opv <= 3) return opv;
		if (opv == 4) return regA;
		if (opv == 5) return regB;
		if (opv == 6) return regC;
		if (opv == 7) console.log("Found opv 7!");
	}
}