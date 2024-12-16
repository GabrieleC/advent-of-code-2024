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

for (let c = 0; ; c++) {
	const text = render(indexCoords());
	if (text.includes("########")) {
		console.log(text);
		console.log(c);
		break;
	}
	next();
}

function next() {
	for (const robot of robots) {
		let x = (robot.coord[0] + robot.speed[0]) % width;
		if (x < 0) x = width + x;
		
		let y = (robot.coord[1] + robot.speed[1]) % height;
		if (y < 0) y = height + y;
		
		robot.coord[0] = x;
		robot.coord[1] = y;
	}
}

function indexCoords() {
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
	return coords;
}

function render() {
	let text = "";
	for (let row = 0; row < height; row++) {
		for (let col = 0; col < width; col++) {
			let sym = ".";
			for (let robot of robots) {
				if (robot.coord[0] == col && robot.coord[1] == row) {
					sym = "#";
					break;
				}
			}
			text += sym;
		}
		text += "\r\n";
	}
	return text;
}