import * as fs from "node:fs";
const rows = fs.readFileSync("input.txt", "utf-8").split("\r\n");

const machines = [];
for (let i = 0; i < rows.length; i=i+4) {
	const machine = {};
	const a = rows[i].split(": ")[1].split(", ");
	const b = rows[i+1].split(": ")[1].split(", ");
	const p = rows[i+2].split(": ")[1].split(", ");
	machine.ax = Number(a[0].split("+")[1]);
	machine.ay = Number(a[1].split("+")[1]);
	machine.bx = Number(b[0].split("+")[1]);
	machine.by = Number(b[1].split("+")[1]);
	machine.px = Number(p[0].split("=")[1]);
	machine.py = Number(p[1].split("=")[1]);
	machines.push(machine);
}

for (let m of machines) { m.px += 10000000000000; m.py += 10000000000000; }

let sum = 0;
for (let mIdx = 0; mIdx < machines.length; mIdx++) {
	const m = machines[mIdx];
	const {ax, bx, ay, by, px, py} = m;
	
	const b = (py * ax - px * ay) / (by * ax - bx * ay);
	const a = (bx * py - by * px) / (ay * bx - ax * by);
	
	if (b % 1 == 0 && a % 1 == 0) sum += (a * 3) + b;
}

console.log("score: " + sum);