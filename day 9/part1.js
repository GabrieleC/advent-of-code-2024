import * as fs from "node:fs";
const data = fs.readFileSync("input.txt", "utf-8");

const disk = data.split("").map(c => Number(c));

let blocks = [];
let file = true;
for (let i = 0; i < disk.length; i++) {
	let value = file ? i / 2 : ".";
	blocks.push(...Array(disk[i]).fill(value));
	file = !file;
}

let cs = 0;
for (let h = 0, t = blocks.length - 1; h <= t; h++) {
	if (blocks[h] != ".") {
		cs += (blocks[h] * h);
	} else {
		cs += (blocks[t] * h);
		do {t--} while (blocks[t] == ".");
	}
}