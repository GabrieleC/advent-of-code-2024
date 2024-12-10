import * as fs from "node:fs";
const data = fs.readFileSync("input.txt", "utf-8");
const mtx = data.split("\r\n").map(r => r.split("").map(i => Number(i)));

let sum = 0;
for (let rowId = 0; rowId < mtx.length; rowId++) {
	for (let colId = 0; colId < mtx[rowId].length; colId++) {
		if (mtx[rowId][colId] == 0) {
			let s = new Set();
			find([rowId, colId]).forEach(c => s.add(c.join(",")));
			sum += s.size;
		}
	}
}

console.log(sum);

function find(coord) {
	const value = mtx[coord[0]][coord[1]];
	
	if (value == 9) return [coord];
	
	const nCoord = [];
	if (coord[0] > 0) {
		nCoord.push([coord[0] - 1, coord[1]]);
	}
	if (coord[0] < mtx.length - 1) {
		nCoord.push([coord[0] + 1, coord[1]]);
	}
	if (coord[1] > 0) {
		nCoord.push([coord[0], coord[1] - 1]);
	}
	if (coord[1] < mtx[coord[0]].length - 1) {
		nCoord.push([coord[0], coord[1] + 1]);
	}
	
	return nCoord
		.filter(c => mtx[c[0]][c[1]] == value + 1)
		.map(c => find(c))
		.flat();
}