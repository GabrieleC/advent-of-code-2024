import * as fs from "node:fs";
const data = fs.readFileSync("input.txt", "utf-8");

const stones = data.split(" ").map(s => Number(s));
const cache = new Map();

let count = 0;
for (let stone of stones) {
	count += countStones(stone, 0);
}

console.log(count);

function countStones(stone, i = 0) {
	const key = stone + "," + i;
	if (cache.has(key)) return cache.get(key);
	
	let count = 1;
	for (; i < 75; i++) {
		
		if (stone == 0) {
			stone = 1;
		} else {
			const sStone = String(stone);
			if (sStone.length % 2 == 0) {
				stone = Number(sStone.slice(0, sStone.length / 2));
				const nStone = Number(sStone.slice(sStone.length / 2));
				count += countStones(nStone, i + 1);
			} else {
				stone *= 2024;
			}
		}
	}
	
	cache.set(key, count);
	return count;
}