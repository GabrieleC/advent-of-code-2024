import * as fs from "node:fs";

const data = fs.readFileSync("input.txt", "utf-8");
const [top, bottom] = data.split("\r\n\r\n");
const mtx = top.split("\r\n").map(e => e.split(""));
const ops = bottom.replaceAll("\r\n", "").split("");

let pos = find("@");
for (const op of ops) {
	const [rowDir, colDir] = decodeOp(op);
	const moved = move(pos, rowDir, colDir);
	if (moved) {
		pos = [pos[0] + rowDir, pos[1] + colDir];
	}
}

console.log(findScore());

function move(coord, row, col) {
	const target = [coord[0] + row, coord[1] + col];
	const targetVal = mtx[target[0]][target[1]];
	
	if (targetVal == "#") return false;
	
	let targetMoved = false;
	if (targetVal == "O") targetMoved = move(target, row, col);
	
	if (targetVal == "." || targetMoved) {
		mtx[target[0]][target[1]] = mtx[coord[0]][coord[1]];
		mtx[coord[0]][coord[1]] = ".";
		return true;
	}
	
	return false;
}

function find(sym) {
	for (let row = 0; row < mtx.length; row++) {
		for (let col = 0; col < mtx[row].length; col++) {
			if (mtx[row][col] == sym) return [row, col];
		}
	}
}

function decodeOp(op) {
	if (op == "<") return [0, -1];
	if (op == ">") return [0, 1];
	if (op == "^") return [-1, 0];
	if (op == "v") return [1, 0];
}

function render() {
	return mtx.map(row => row.join("")).join("\r\n");
}

function findScore() {
	let score = 0;
	for (let row = 0; row < mtx.length; row++) {
		for (let col = 0; col < mtx[row].length; col++) {
			if (mtx[row][col] == "O") {
				score += (row * 100) + col;
			}
		}
	}
	return score;
}