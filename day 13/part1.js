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

let sum = 0;
for (let m of machines) {
	let best;
	let a = 0, b = 0;
	while (b < 100) {
		a++;
		if (a > 100) {
			a = 0;
			b++;
		}
		
		const x = (a*m.ax) + (b*m.bx);
		const y = (a*m.ay) + (b*m.by);
		
		if (x == m.px && y == m.py) {
			const score = (a * 3) + b;
			if (best === undefined || score < best) best = score;
		}
	}
	if (best !== undefined) sum += best;
}

console.log(sum);