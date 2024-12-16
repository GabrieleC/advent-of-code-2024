import * as fs from "node:fs";
const data = fs.readFileSync("input.txt", "utf-8");

const width = 101, height = 103;

const robots = [];
for (const row of data.split("\r\n")) {
	const splitted = row.split(" ");
	const coord = splitted[0].substring(2).split(",").map(i => Number(i));
	const speed = splitted [1].substring(2).split(",").map(i => Number(i));
	robots.push({coord, speed});
}

for (const robot of robots) {
	for (let c = 0; c < 100; c++) {
		let x = (robot.coord[0] + robot.speed[0]) % width;
		if (x < 0) x = width + x;
		
		let y = (robot.coord[1] + robot.speed[1]) % height;
		if (y < 0) y = height + y;
		
		robot.coord[0] = x;
		robot.coord[1] = y;
	}
}

const coords = new Map();
for (const robot of robots) {
	const key = robot.coord.join(",");
	let value = 0;
	if (coords.has(key)) {
		value = coords.get(key);
	}
	value++;
	coords.set(key, value);
}

const halfWidth = Math.floor(width / 2);
const halfHeight = Math.floor(height / 2);

const q1 = countArea(0, halfWidth, 0, halfHeight);
const q2 = countArea(halfWidth + 1, width, 0, halfHeight);
const q3 = countArea(0, halfWidth, halfHeight + 1, height);
const q4 = countArea(halfWidth + 1, width, halfHeight + 1, height);

console.log(q1 * q2 * q3 * q4);

function countArea(startCol, endCol, startRow, endRow) {
	let sum = 0;
	for (let row = startRow; row < endRow; row++) {
		for (let col = startCol; col < endCol; col++) {
			const key = col + "," + row;
			if (coords.has(key)) sum += coords.get(key);
		}
	}
	return sum;
}