import * as fs from "node:fs";
const data = fs.readFileSync("input.txt", "utf-8");
const mtx = data.split("\r\n").map(r => r.split(""));

const dirs = [[1, 0],[-1, 0],[0, 1],[0, -1]];
let best = Infinity;
const visited = [];
const scores = new Map();
const alts = [() => paths(find("S"), [0, 1])];

while (alts.length > 0) { alts.pop()() }

console.log(best);

function paths(coord, dir, score = 0, len = 0) {
	if (mtx[coord[0]][coord[1]] == "E") {
		if (score < best) best = score;
		return;
	}
	
	visited.length = len;
	const key = coord.join(",");
	visited.push(key);
	const nodeScore = scores.get(key);
	if (score >= nodeScore) return;
	scores.set(key, score);
	
	for (const newDir of dirs) {
		const dirCoord = [coord[0] + newDir[0], coord[1] + newDir[1]];
		if (mtx[dirCoord[0]][dirCoord[1]] !== "#" && !visited.includes(dirCoord.join(","))) {
			let nextScore = 1000;
			if (dir[0] == newDir[0] && dir[1] == newDir[1]) nextScore = 0;
			if (dir[0] + newDir[0] == 0 && dir[1] + newDir[1] == 0) nextScore = 2000;
			nextScore += score + 1;
			if (nextScore < best) {
				const len = visited.length;
				alts.push(() => paths(dirCoord, newDir, nextScore, len));
			}
		}
	}
}

function find(sym) {
	for (let row = 0; row < mtx.length; row++) {
		for (let col = 0; col < mtx[row].length; col++) {
			if(mtx[row][col] == sym) return [row, col];
		}
	}
}