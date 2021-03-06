/**
 * Map - 25 x 20
 * 0 - empty space
 * 1 - brick tanks can destroy
 * 2 - brick tanks couldn't destroy
 * 3 - water
 * 4 - grass
 * 5 - eagle (base)
 * 6 - player tank
 * 7 - enemy tank
 */

export const levelSchema: Array<Array<number>> = [
	[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	[2, 7, 0, 1, 7, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 7, 2],
	[2, 4, 4, 1, 1, 0, 1, 1, 0, 1, 1, 3, 3, 3, 1, 7, 0, 1, 1, 4, 4, 1, 1, 0, 2],
	[2, 4, 4, 4, 4, 4, 1, 0, 0, 1, 1, 3, 3, 3, 1, 0, 0, 1, 1, 4, 4, 1, 1, 0, 2],
	[2, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 0, 3, 3, 2],
	[2, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 0, 3, 3, 2],
	[2, 0, 0, 1, 1, 7, 0, 1, 0, 0, 0, 0, 7, 0, 0, 0, 0, 1, 1, 0, 7, 1, 1, 0, 2],
	[2, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2],
	[2, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
	[2, 0, 0, 0, 0, 1, 1, 0, 0, 0, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 2],
	[2, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 0, 0, 0, 2],
	[2, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 2, 2, 1, 2],
	[2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 2],
	[2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 2],
	[2, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 2],
	[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2],
	[2, 3, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2],
	[2, 3, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2],
	[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
	[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];
