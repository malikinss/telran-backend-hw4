// RandomNumbersStream.ts

/**
 * Options for configuring the random numbers stream.
 * This interface defines the parameters for generating random numbers.
 * The `amount` parameter specifies how many random numbers to generate.
 * The `min` and `max` parameters define the range of possible values.
 * The `isUnique` parameter determines whether the generated numbers should be unique.
 * The `RandomNumbersStream` class uses these options to generate the desired stream of random numbers.
 */
export interface RandomNumbersOptions {
	amount: number;
	min?: number;
	max?: number;
	isUnique?: boolean;
}

/**
 * Class for generating a stream of random numbers.
 * This class allows you to specify the amount, range, and uniqueness of the numbers.
 * It provides a method to generate the random numbers based on the provided options.
 */
export class RandomNumbersStream {
	private amount: number;
	private min: number;
	private max: number;
	private isUnique: boolean;

	/**
	 * Constructor for the RandomNumbersStream class.
	 * @param options - The options for configuring the random numbers stream.
	 * @param options.amount - The number of random numbers to generate.
	 * @param options.min - The minimum value for the random numbers (default: Number.MIN_SAFE_INTEGER).
	 * @param options.max - The maximum value for the random numbers (default: Number.MAX_SAFE_INTEGER).
	 * @param options.isUnique - Whether the generated numbers should be unique (default: false).
	 * @throws Will throw an error if the range is invalid, amount is non-positive, or if unique numbers cannot be generated within the specified range.
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
	 * Generates a stream of random numbers based on the specified options.
	 * @returns An array of random numbers.
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
