// displayRandomNumbers.ts

import { RandomNumbersStream } from "./RandomNumbersStream.ts";
import type { Params } from "./params.ts";

/**
 * Displays random numbers using the RandomNumbersStream.
 *
 * Creates a stream of random numbers according to the given parameters
 * and pipes them to `stdout`. The function returns a promise that resolves
 * when the stream ends or rejects if the stream emits an error.
 *
 * @param {Params} params - Parameters for random number generation:
 *   - `amount`: Total count of numbers to generate.
 *   - `min`: Minimum number in the range (inclusive).
 *   - `max`: Maximum number in the range (inclusive).
 *   - `isUnique`: Whether generated numbers must be unique.
 *
 * @returns {Promise<void>} Resolves when all numbers are displayed,
 *   rejects if an error occurs in the stream.
 */
export function displayRandomNumbers(params: Params): Promise<void> {
	const params_str = JSON.stringify(params, null, 2);
	console.log("\nUsing parameters:", params_str, "\n");

	return new Promise((resolve, reject) => {
		// Create a new instance of the RandomNumbersStream
		const stream = new RandomNumbersStream(
			params.amount,
			params.min,
			params.max,
			params.isUnique
		);

		stream.pipe(process.stdout);

		stream.once("end", () => {
			console.log(); // New line after stream ends
			console.log("\nAll random numbers generated.");
			resolve();
		});

		stream.on("error", (err) => {
			console.error("Stream error:", err.message);
			reject(err);
		});
	});
}
