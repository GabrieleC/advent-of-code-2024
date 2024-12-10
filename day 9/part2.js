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

for (let t = blocks.length - 1; t >= 0;) {
	
	// find first file from tail
	while (blocks[t] == ".") t--;
	
	// count file size
	let fsize = 1;
	while (blocks[t - fsize] == blocks[t]) fsize++;
	
	// find first fitting space from left
	let h = 0;
	while (h < t) {
		
		// find first free space from left
		while (blocks[h] != "." && h < t) h++;
		
		// count space size
		let ssize = 1;
		while (blocks[h + ssize] == ".") ssize++;
		
		if (ssize >= fsize) break;
		h++;
	}
	
	// fitting space found!
	if (h < t) {
		blocks.splice(h, fsize, ...Array(fsize).fill(blocks[t]));
		blocks.splice(t - fsize + 1, fsize, ...Array(fsize).fill("."));
	}
	
	t -= fsize;
}

let cs = 0;
for (let i = 0; i < blocks.length; i++) {
	if (blocks[i] != ".") cs += blocks[i] * i;
}

console.log(cs);