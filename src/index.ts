// index.ts

import { displayRandomNumbers } from "./utils/displayRandomNumbers.ts";
import { loadParams } from "./utils/params.ts";

/**
 * Application entry point.
 *
 * Loads parameters, then generates and displays random numbers
 * using the RandomNumbersStream via the displayRandomNumbers utility.
 *
 * @async
 * @throws {Error} Propagates any errors encountered during execution.
 */
async function main() {
	const params = loadParams();
	await displayRandomNumbers(params);
}

// Run main and catch any unhandled errors.
main().catch((err) => {
	console.error(err);
});
