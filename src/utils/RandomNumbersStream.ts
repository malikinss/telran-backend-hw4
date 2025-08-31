// RandomNumbersStream.ts

/**
 * Options for generating random numbers.
 * @interface RandomNumbersOptions
 * @param amount - The total number of random numbers to generate.
 * @param min - The minimum value in the range (inclusive). Defaults to Number.MIN_SAFE_INTEGER.
 * @param max - The maximum value in the range (inclusive). Defaults to Number.MAX_SAFE_INTEGER.
 * @param isUnique - Whether all generated numbers should be unique. Defaults to false.
 */
export interface RandomNumbersOptions {
	amount: number;
	min?: number;
	max?: number;
	isUnique?: boolean;
}

/**
 * A class for generating an array of random integers within a specified range.
 *
 * This class allows generating a specified number of random integers, optionally ensuring uniqueness
 * and defining a custom range.
 *
 * @param amount - The total number of random numbers to generate (must be > 0).
 * @param min - The minimum value in the range (inclusive). Defaults to Number.MIN_SAFE_INTEGER.
 * @param max - The maximum value in the range (inclusive). Defaults to Number.MAX_SAFE_INTEGER.
 * @param isUnique - Whether all generated numbers should be unique. Defaults to false.
 *
 * @example
 * ```typescript
 * const generator = new RandomNumbersStream({ amount: 5, min: 1, max: 10, isUnique: true });
 * const numbers = generator.generate();
 * console.log(numbers); // [1, 7, 4, 9, 2]
 * ```
 */
export class RandomNumbersStream {
	private amount: number;
	private min: number;
	private max: number;
	private isUnique: boolean;

	/**
	 * Creates an instance of RandomNumbersStream.
	 *
	 * Args:
	 *   {RandomNumbersOptions} options - The configuration options for number generation.
	 *
	 * Params:
	 *   @param amount (number): The total number of random numbers to generate (must be > 0).
	 *   @param min (number): The minimum value in the range (inclusive). Defaults to Number.MIN_SAFE_INTEGER.
	 *   @param max (number): The maximum value in the range (inclusive). Defaults to Number.MAX_SAFE_INTEGER.
	 *   @param isUnique (boolean): Whether generated numbers must be unique. Defaults to false.
	 *
	 * @returns
	 *   RandomNumbersStream: The instance of the RandomNumbersStream class.
	 *
	 * @throws
	 *   Error: If `min` is greater than or equal to `max`.
	 *   Error: If `amount` is less than or equal to zero.
	 *   Error: If `isUnique` is true but the range is too small to generate the requested amount of unique numbers.
	 *
	 * @example
	 * ```typescript
	 * const generator = new RandomNumbersStream({ amount: 10, min: 0, max: 100, isUnique: true });
	 * ```
	 */
	constructor({
		amount,
		min = Number.MIN_SAFE_INTEGER,
		max = Number.MAX_SAFE_INTEGER,
		isUnique = false,
	}: RandomNumbersOptions) {
		if (min >= max) {
			throw new Error("Invalid range: min must be less than max.");
		}
		if (amount <= 0) {
			throw new Error("Amount must be greater than zero.");
		}
		if (isUnique && amount > max - min + 1) {
			throw new Error(
				"Cannot generate unique numbers: range too small."
			);
		}

		this.amount = amount;
		this.min = min;
		this.max = max;
		this.isUnique = isUnique;
	}

	/**
	 * Generates an array of random integers based on the specified options.
	 *
	 * @returns
	 *   number[]: An array of random integers of the specified length and range.
	 *
	 * @example
	 * ```typescript
	 * const generator = new RandomNumbersStream({ amount: 5, min: 1, max: 10 });
	 * const result = generator.generate();
	 * console.log(result); // e.g., [2, 8, 4, 6, 1]
	 * ```
	 */
	public generate(): number[] {
		const result: number[] = [];
		const used = new Set<number>();

		while (result.length < this.amount) {
			const num =
				Math.floor(Math.random() * (this.max - this.min + 1)) +
				this.min;

			if (this.isUnique) {
				if (!used.has(num)) {
					used.add(num);
					result.push(num);
				}
			} else {
				result.push(num);
			}
		}

		return result;
	}
}
