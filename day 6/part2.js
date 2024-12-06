import * as fs from "node:fs";

const data = fs.readFileSync("input.txt", "utf-8");

const mtx = data.split("\r\n").map(row => row.split(""));

// find starting point coordinates
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

row--;

// calculate original path coordinates
const oPath = [];
path(mtx, row, col, (coord) => {
	if (!oPath.some(c => c[0] == coord[0] && c[1] == coord[1])) {
		oPath.push(coord)
	}
});

// calculate every possible alternative
const coordEqual = (a,b) => a[0] == b[0] && a[1] == b[1];
let count = 0;
for (let i = 1; i < oPath.length; i++) {
	let coord = oPath[i];
	
	if (coord == oPath[0]) continue;
	if (i % 100 == 0) console.log("testing " + i + " of " + oPath.length);
	
	mtx[coord[0]][coord[1]] = "#";
	const p = [];
	path(mtx, row, col, c => {
		p.push(c);
		if (looped(p, coordEqual)) {
			count++;
			return true;
		}
	});
	mtx[coord[0]][coord[1]] = ".";
}

console.log(count);

// return true if array contains a looped sequence
function looped(a, equals) {

	let head;
	for (let i = a.length - 2; i >= 0; i--) {
		if (equals(a[i], a[a.length - 1])) {
			head = i;
			break;
		}
	}
	
	if (head === undefined) return false;
	
	let gap = a.length - head - 1;
	let cur = head - 1;
	
	for (; cur >= 0 && cur + gap > head; cur--) {
		if (!equals(a[cur], a[cur + gap])) return false;
	}
	
	return cur + gap == head;
}

// walk path in mtx and call handle for each step
function path(mtx, row, col, handle) {
	
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
			const stop = handle([row, col]);
			if (stop) break;
		}
	}
}