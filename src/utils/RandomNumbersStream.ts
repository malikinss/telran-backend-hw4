// RandomNumbersStream.ts

import { Readable } from "node:stream";

/**
 * A readable stream that generates random numbers.
 * Supports both unique and non-unique number generation.
 */
export class RandomNumbersStream extends Readable {
	private readonly min: number;
	private readonly max: number;
	private readonly amount: number;
	private readonly isUnique: boolean;

	/**
	 * Creates a stream of random numbers.
	 *
	 * @param {number} amount - The total number of random numbers to generate.
	 * @param {number} [min=Number.MIN_SAFE_INTEGER] - The minimum value in the range (inclusive).
	 * @param {number} [max=Number.MAX_SAFE_INTEGER] - The maximum value in the range (inclusive).
	 * @param {boolean} [isUnique=false] - Whether all generated numbers should be unique.
	 *
	 * @throws {Error} If parameters are invalid (e.g., amount ≤ 0, min ≥ max, or range too small for uniqueness).
	 */
	constructor(
		amount: number,
		min: number = Number.MIN_SAFE_INTEGER,
		max: number = Number.MAX_SAFE_INTEGER,
		isUnique: boolean = false
	) {
		super({ objectMode: true });
		this.validateParams(amount, min, max, isUnique);
		this.amount = amount;
		this.min = min;
		this.max = max;
		this.isUnique = isUnique;
	}

	/**
	 * Validates constructor parameters.
	 *
	 * @param {number} amount - The number of values to generate.
	 * @param {number} min - Minimum value of the range.
	 * @param {number} max - Maximum value of the range.
	 * @param {boolean} isUnique - Whether numbers should be unique.
	 *
	 * @throws {Error} If parameters are invalid.
	 *   - Amount is not a positive integer.
	 *   - Min or max are not integers.
	 *   - Min is greater than or equal to max.
	 *   - Uniqueness cannot be achieved within the given range.
	 */
	private validateParams(
		amount: number,
		min: number,
		max: number,
		isUnique: boolean
	): void {
		if (!Number.isInteger(amount) || amount <= 0) {
			throw new Error("Amount must be a positive integer.");
		}
		if (!Number.isInteger(min) || !Number.isInteger(max)) {
			throw new Error("Min and max must be integers.");
		}
		if (min >= max) {
			throw new Error("Invalid range: min must be less than max.");
		}

		const rangeLength = max - min + 1;
		if (isUnique && amount > rangeLength) {
			throw new Error(
				"Cannot generate unique numbers: range too small."
			);
		}
	}

	/**
	 * Implementation of the stream's `_read` method.
	 * Pushes generated numbers into the stream.
	 */
	_read(): void {
		for (const num of this.generate()) {
			this.push(num.toString() + "; ");
		}
		this.push(null); // end of stream
	}

	/**
	 * Generates random numbers based on uniqueness setting.
	 *
	 * @returns {number[]} An array of random numbers.
	 */
	private generate(): number[] {
		if (this.isUnique) {
			return this.generateUnique();
		}
		return Array.from({ length: this.amount }, () => this.randomInt());
	}

	/**
	 * Generates unique random numbers.
	 *
	 * @returns {number[]} An array of unique random numbers.
	 */
	private generateUnique(): number[] {
		const rangeLength = this.max - this.min + 1;

		// If range is small, use "shuffling" method
		if (rangeLength <= this.amount * 2) {
			const pool = Array.from(
				{ length: rangeLength },
				(_, i) => this.min + i
			);
			return this.shuffle(pool).slice(0, this.amount);
		}

		// If range is large, use a Set to ensure uniqueness
		const result = new Set<number>();
		while (result.size < this.amount) {
			result.add(this.randomInt());
		}
		return [...result];
	}

	/**
	 * Generates a single random integer within the given range.
	 *
	 * @returns {number} A random integer between min and max (inclusive).
	 */
	private randomInt(): number {
		return (
			Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
		);
	}

	/**
	 * Shuffles an array in place using the Fisher-Yates algorithm.
	 *
	 * @template T
	 * @param {T[]} array - The array to shuffle.
	 * @returns {T[]} The shuffled array.
	 */
	private shuffle<T>(array: T[]): T[] {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}
}
