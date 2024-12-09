import * as fs from "node:fs";
const data = fs.readFileSync("input.txt", "utf-8");
const mtx = data.split("\r\n").map(r => r.split(""));

let nodes = new Set();
let coord = [0,0];
while (true) {
	coord = search(coord);
	if (coord === false) break;
	
	let nCoord = coord;
	while (true) {
		nCoord = search(next(nCoord), mtx[coord[0]][coord[1]]);
		if (nCoord === false) break;
		
		const delta = [nCoord[0] - coord[0], nCoord[1] - coord[1]];
		
		[
			...antinodes(coord, delta),
			...antinodes(nCoord, [-delta[0], -delta[1]])
		].forEach(n => nodes.add(String(n)));
	}
	
	coord = next(coord);
}

console.log(nodes.size);

function next(coord) {
	if (coord[1] < mtx[coord[0]].length - 1) {
		return [coord[0], coord[1] + 1];
	} else if (coord[0] < mtx.length - 1) {
		return [coord[0] + 1, 0];
	} else {
		return false;
	}
}

function search(coord = [0,0], freq = "*") {
	let cIdx = coord[1];
	for (let rIdx = coord[0]; rIdx < mtx.length; rIdx++) {
		for (; cIdx < mtx[rIdx].length; cIdx++) {
			if (mtx[rIdx][cIdx] == freq || (freq == "*" && mtx[rIdx][cIdx] != ".")) {
				return [rIdx, cIdx];
			}
		}
		cIdx = 0;
	}
	return false;
}

function antinodes(coord, delta) {
	const nodes = [];
	while (isValidNode(coord)) {
		nodes.push(coord);
		coord = [coord[0] - delta[0], coord[1] - delta[1]];
	}
	return nodes;
}

function isValidNode(node) {
	return node[0] >= 0 && node[0] < mtx.length && 
		   node[1] >= 0 && node[1] < mtx[node[0]].length;
}