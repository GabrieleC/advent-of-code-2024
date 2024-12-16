import * as fs from "node:fs";

const data = fs.readFileSync("input.txt", "utf-8");
const [top, bottom] = data.split("\r\n\r\n");
const ops = bottom.replaceAll("\r\n", "").split("");
const mtx = top.split("").map(i => {
	if (i == "#") return "##";
	if (i == ".") return "..";
	if (i == "O") return "[]";
	if (i == "@") return "@.";
	return i;
}).join("").split("\r\n").map(e => e.split(""));

let pos = find("@");
let count = 0;
for (const op of ops) {
	const [rowDir, colDir] = decodeOp(op);
	if (isMoveable(pos, rowDir, colDir)) {
		pos = move(pos, rowDir, colDir);
	}
}

console.log(findScore());

function isMoveable(coord, row, col) {
	const target = [coord[0] + row, coord[1] + col];
	const targetVal = mtx[target[0]][target[1]];
	
	if (targetVal == "#") return false;
	if (targetVal == ".") return true;
	
	const targetMoveable = isMoveable(target, row, col);
	
	if (row == 0) return targetMoveable;
	
	let otherHalf;
	if (targetVal == "[") {
		otherHalf = [target[0], target[1] + 1];
	} else {
		otherHalf = [target[0], target[1] - 1];
	}
	
	return targetMoveable && isMoveable(otherHalf, row, col);
}

function move(coord, row, col) {
	const target = [coord[0] + row, coord[1] + col];
	const targetVal = mtx[target[0]][target[1]];
	
	if (targetVal != ".") {
		if (row != 0) {
			if (targetVal == "[") {
				move([target[0], target[1] + 1], row, col);
			} else {
				move([target[0], target[1] - 1], row, col);
			}
		}
		move(target, row, col);
	}
	
	mtx[target[0]][target[1]] = mtx[coord[0]][coord[1]];
	mtx[coord[0]][coord[1]] = ".";
	
	return target;
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
			if (mtx[row][col] == "[") {
				score += (row * 100) + col;
			}
		}
	}
	return score;
}