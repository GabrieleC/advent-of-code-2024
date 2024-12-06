import * as fs from "node:fs";

const data = fs.readFileSync("input.txt", "utf-8");

const mtx = data.split("\r\n").map(row => row.split(""));

let row, col;
outer: for (let r = 0; r < mtx.length; r++) {
	for (let c = 0; c < mtx[r].length; c++) {
		if (mtx[r][c] == "^") {
			row = r;
			col = c;
			break outer;
		}
	}
}

let rowDir = -1;
let colDir = 0;

let count = 1;
while (true) {
	
	let nRow = row + rowDir;
	let nCol = col + colDir;
	
	if (nRow < 0 || nRow >= mtx.length || nCol < 0 || nCol >= mtx[nRow].length) {
		break;
	} else if (mtx[nRow][nCol] == "#") {
		if (rowDir == 1) {
			rowDir = 0;
			colDir = -1;
		} else if (rowDir == -1) {
			rowDir = 0;
			colDir = 1;
		} else if (colDir == 1) {
			rowDir = 1;
			colDir = 0;
		} else {
			rowDir = -1;
			colDir = 0;
		}
	} else {
		row = nRow;
		col = nCol;
		if (mtx[row][col] == ".") {
			mtx[row][col] = "X";
			count++;
		}
	}
}

console.log(count);