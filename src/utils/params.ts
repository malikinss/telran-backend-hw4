// params.ts

import config from "config";

/**
 * Parameters for random number generation.
 */
export interface Params {
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

/** Generic function to get parameter from config or fallback to default.
 *
 * @param {T} key - The parameter name to retrieve.
 * @param {Params[T]} fallback - The fallback value if not found in config.
 * @returns {Params[T]} The parameter value.
 */

function getParam<T extends keyof Params>(
	key: T,
	fallback: Params[T]
): Params[T] {
	return config.has(key) ? (config.get(key) as Params[T]) : fallback;
}

/**
 * Collects all parameters from config or defaults.
 *
 * @returns {Params} The parameters to be used for random number generation.
 */
export function loadParams(): Params {
	return {
		amount: getParam("amount", defaultParams.amount),
		min: getParam("min", defaultParams.min),
		max: getParam("max", defaultParams.max),
		isUnique: getParam("isUnique", defaultParams.isUnique),
	};
}
