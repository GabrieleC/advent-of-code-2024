import * as fs from "node:fs";
const data = fs.readFileSync("input.txt", "utf-8");
const mtx = data.split("\r\n").map(r => r.split(""));

const regs = [];

let sum = 0;
for (let rId = 0; rId < mtx.length; rId++) {
	for (let cId = 0; cId < mtx[rId].length; cId++) {
		
		const coord = [rId,cId];
		if (isVisited(coord)) continue;
		const type = mtx[rId][cId];
		
		const reg = outline(coord);
		regs.push(reg);
		
		const prm = perimeter(reg);
		const area = reg.length;
		
		sum += area * prm;
	}
}

console.log(sum);

function outline(coord, reg = []) {
	const [rId, cId] = coord;
	const type = mtx[rId][cId];
	reg.push(coord);
	
	const dirs = [];
	if (rId > 0) dirs.push([rId - 1, cId]);
	if (cId > 0) dirs.push([rId, cId - 1]);
	if (rId < mtx.length - 1) dirs.push([rId + 1, cId]);
	if (cId < mtx[rId].length - 1) dirs.push([rId, cId + 1]);
	
	dirs.filter(c => !included(c, reg))
		.filter(c => mtx[c[0]][c[1]] == type)
		.forEach(c => reg.push(...outline(c, reg)))
	
	return [...distinct(reg)];
}

function perimeter(reg) {
	let obs = 0;
	for (let c of reg) {
		const dirs = [];
		const [rId, cId] = c;
		if (rId > 0) { dirs.push([rId - 1, cId]) } else obs++;
		if (cId > 0) { dirs.push([rId, cId - 1]) } else obs++;
		if (rId < mtx.length - 1) { dirs.push([rId + 1, cId]) } else obs++;
		if (cId < mtx[rId].length - 1) { dirs.push([rId, cId + 1]) } else obs++;
		
		const type = mtx[c[0]][c[1]];
		obs += dirs.filter(dir => mtx[dir[0]][dir[1]] != type)
			.length;
		
	}
	return obs;
}

function distinct(input) {
	const result = [];
	for (let e of input) {
		if (!result.some(i => i[0] == e[0] && i[1] == e[1])) result.push(e);
	}
	return result;
}

function isVisited(coord) {
	for (let r of regs) {
		if (included(coord, r)) return true;
	}
	return false;
}

function included(coord, a) {
	for (let c of a) {
		if (c[0] == coord[0] && c[1] == coord[1]) return true;
	}
	return false;
}