// index.ts

import { RandomNumbersStream } from "./utils/RandomNumbersStream.ts";
import config from "config";

/**
 * Parameters for random number generation.
 */
interface Params {
	amount: number;
	min: number;
	max: number;
	isUnique: boolean;
}

/** Default parameters used if no config is provided. */
const defaultParams: Params = {
	amount: 7,
	min: 1,
	max: 49,
	isUnique: false,
};

/**
 * Retrieves a numeric parameter from the config or falls back to default.
 *
 * @param {keyof Params} key - The parameter name to retrieve.
 * @param {number} fallback - The fallback value if not found in config.
 * @returns {number} The parameter value as a number.
 */
function getNumberParam(key: keyof Params, fallback: number): number {
	if (config.has(key)) {
		console.log(`Using ${key} from config.`);
		return Number(config.get(key));
	}
	console.log(`Using ${key} from default.`);
	return fallback;
}

/**
 * Retrieves a boolean parameter from the config or falls back to default.
 *
 * @param {keyof Params} key - The parameter name to retrieve.
 * @param {boolean} fallback - The fallback value if not found in config.
 * @returns {boolean} The parameter value as a boolean.
 */
function getBoolParam(key: keyof Params, fallback: boolean): boolean {
	if (config.has(key)) {
		console.log(`Using ${key} from config.`);
		return Boolean(config.get(key));
	}
	console.log(`Using ${key} from default.`);
	return fallback;
}

/**
 * Collects all parameters from config or defaults.
 *
 * @returns {Params} The parameters to be used for random number generation.
 */
function getParams(): Params {
	return {
		amount: getNumberParam("amount", defaultParams.amount),
		min: getNumberParam("min", defaultParams.min),
		max: getNumberParam("max", defaultParams.max),
		isUnique: getBoolParam("isUnique", defaultParams.isUnique),
	};
}

/**
 * Displays random numbers using the RandomNumbersStream.
 *
 * @param {Params} params - The parameters for random number generation.
 */
function displayRandomNumbers(params: Params): void {
	console.log("\nUsing parameters:", JSON.stringify(params, null, 2) + "\n");

	// Create a new instance of the RandomNumbersStream
	const stream = new RandomNumbersStream(
		params.amount,
		params.min,
		params.max,
		params.isUnique
	);

	stream.pipe(process.stdout);

	stream.on("end", () => {
		console.log(); // New line after stream ends
		console.log("\nAll random numbers generated.");
	});

	stream.on("error", (err) => {
		console.error("Stream error:", err.message);
	});
}

// Entry point: start random number generation with resolved parameters.
displayRandomNumbers(getParams());
