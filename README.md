# Homework 4: RandomNumbersStream Application

## Task Definition

```
RandomNumbersStream class in a separate module
generates a stream of random integer numbers.
Constructor takes:
- amount of numbers to generate
- minimal value (optional, default = Number.MIN_SAFE_INTEGER)
- maximal value (optional, default = Number.MAX_SAFE_INTEGER)
- isUnique (optional, default = false):
  * true → only unique numbers are generated
  * false → duplicates are allowed

index.ts
Loads parameters from config (with defaults: N=7, min=1, max=49, isUnique=false),
then uses RandomNumbersStream to display random numbers.
Errors should be propagated to the application level for handling.
```

## Description 📝

A TypeScript-based Node.js project that provides a readable stream of random numbers.  
The project consists of modular utilities for parameter management and a reusable function to display generated numbers.

It supports:

-   Unique or non-unique random number generation
-   Configurable range and amount of numbers
-   Streaming output to console or other writable streams
-   Centralized parameter loading with `config`
-   Proper error propagation for flexible handling at the application level

## Purpose 🎯

The main objectives of this project are:

-   Practice modular design with TypeScript and Node.js streams
-   Implement reusable utilities for random number generation
-   Explore error handling and propagation patterns
-   Learn configuration-driven parameter management
-   Reinforce clean architecture principles (separation of concerns)

## Features ✨

-   ✅ Generates both unique and non-unique random numbers
-   ✅ Configurable `amount`, `min`, `max`, and `isUnique` options via `config` or defaults
-   ✅ Strong validation for invalid parameters (e.g., invalid ranges, non-positive amounts)
-   ✅ Stream-based output using Node.js `Readable` streams
-   ✅ Efficient algorithms for small and large ranges
-   ✅ Numbers piped directly to stdout with semicolon-separated formatting
-   ✅ Errors surfaced to the application for custom handling

## How It Works 🔍

-   Parameters are loaded using `loadParams` from **params.ts**, falling back to defaults
-   `displayRandomNumbers(params)` creates a `RandomNumbersStream` and pipes output to stdout
-   The stream generates numbers via:
    -   Shuffling method (small ranges)
    -   `Set`-based uniqueness check (large ranges)
-   `end` event resolves the operation cleanly
-   `error` event rejects the promise, allowing application-level error handling

Example flow:

1. `index.ts` runs `main()`
2. Parameters are loaded from config (or defaults)
3. `displayRandomNumbers(params)` is invoked
4. Numbers are generated and streamed to the console
5. On completion → promise resolves
6. On error → promise rejects, and `index.ts` decides how to handle it

## Output 📜

Example formatted console output:

```bash
23; 7; 15; 42; 3; 18; 36;
All random numbers generated.
```

## Usage 📦

```bash
git clone [URL репозитория]
cd [папка проекта]
npm install
ts-node index.ts
```

## Usage Examples 🚀

```typescript
import { displayRandomNumbers } from "./utils/displayRandomNumbers";
import { loadParams } from "./utils/params";

async function main() {
	const params = loadParams();
	await displayRandomNumbers(params);
}

main().catch((err) => {
	console.error("Application error:", err.message);
	process.exit(1);
});
```

## Project Structure 🗂

-   **utils/RandomNumbersStream.ts** – Readable stream class for generating random numbers
-   **utils/displayRandomNumbers.ts** – Utility to create a stream and pipe numbers to stdout (returns a promise)
-   **utils/params.ts** – Parameter loading logic (config + defaults)
-   **index.ts** – Application entry point, error handling, and orchestration
-   **config/** – Optional folder for configuration files
-   **package.json** – Node.js project metadata and dependencies
-   **tsconfig.json** – TypeScript compiler configuration

## Dependencies ✅

-   **TypeScript** 5.x
-   **Node.js** 18+
-   **config** – For reading external configuration files
-   **stream** – Built-in Node.js module for Readable streams

## License 📄

MIT

## Conclusion 🧮

This project allowed me to:

-   Build a modular Node.js application with TypeScript
-   Separate concerns into dedicated modules (`params`, `displayRandomNumbers`, `RandomNumbersStream`)
-   Practice robust error handling with promise-based APIs
-   Reinforce configuration-driven development and clean coding principles

---

Made with ❤️ and `TypeScript` by Sam-Shepsl Malikin
