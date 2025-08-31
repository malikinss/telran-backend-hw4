// RandomNumbersStream.ts

export interface RandomNumbersOptions {
	amount: number;
	min?: number;
	max?: number;
	isUnique?: boolean;
}

export class RandomNumbersStream {
	private amount: number;
	private min: number;
	private max: number;
	private isUnique: boolean;

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
