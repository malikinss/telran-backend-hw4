# Homework 4: RandomNumbersStream and sportloto usage application

## Task Definition

```
RandomNumbersStream class in a separate module
generates stream of the random integer numbers
constructor takes
amount of the streamed numbers
minimal value (optional with default minimal integer value)
maximal value (optional with default maximal integer value)
isUnique - boolean optional parameter with default false
true value means that stream should contain only unique numbers
false value means that no requirement of the unique numbers exists
index.ts
Using RandomNumbersStream for displaying out N unique random numbers in the range [min, max]
N, min, max are defined into config file with default values N = 7, min = 1, max = 49
```

## Description 📝

A TypeScript-based Node.js project that provides a readable stream of random numbers. It supports:

-   Generating unique or non-unique random numbers
-   Configurable range and amount of numbers
-   Streaming output to console or other writable streams
-   Robust validation for parameters to prevent runtime errors

This module is designed to be modular, extendable, and easy to integrate into other Node.js applications.

## Purpose 🎯

The main objectives of this project are:

-   Practice working with Node.js streams and TypeScript classes
-   Implement a real-world utility that handles random number generation
-   Learn parameter validation and configuration handling
-   Explore streaming data and piping to stdout or other writable destinations

## Features ✨

-   ✅ Generates both unique and non-unique random numbers
-   ✅ Configurable `amount`, `min`, `max`, and `isUnique` options
-   ✅ Validation for invalid parameters (e.g., invalid ranges, non-positive amounts)
-   ✅ Stream-based output using Node.js `Readable` streams
-   ✅ Supports large and small ranges efficiently
-   ✅ Console-friendly output with semicolon-separated numbers

## How It Works 🔍

-   Parameters are read from a `config` file, or defaults are used if missing
-   A `RandomNumbersStream` instance is created with the resolved parameters
-   The `_read` method generates numbers and pushes them to the stream
-   Unique numbers are generated via a shuffling method for small ranges or a `Set` for large ranges
-   Non-unique numbers are generated randomly with each read cycle
-   The stream is piped to `process.stdout`, displaying numbers continuously
-   Handles `end` and `error` events for proper stream lifecycle management

Example flow:

1. `displayRandomNumbers(params)` is called
2. Parameters are resolved from config or defaults
3. A `RandomNumbersStream` instance is created
4. Numbers are streamed and printed to the console
5. `end` event signals completion of generation

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
import { RandomNumbersStream } from "./utils/RandomNumbersStream";

const stream = new RandomNumbersStream(5, 1, 50, true);

stream.pipe(process.stdout);

stream.on("end", () => {
	console.log("\nRandom number generation complete.");
});

stream.on("error", (err) => {
	console.error("Stream error:", err.message);
});
```

## Project Structure 🗂

-   **utils/RandomNumbersStream.ts** – Readable stream class for generating random numbers
-   **index.ts** – Entry point and parameter handling logic
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

-   Gain experience with Node.js streams and TypeScript classes
-   Implement configurable random number generation with uniqueness control
-   Practice robust parameter validation and error handling
-   Explore piping and event-driven data processing in Node.js

---

Made with ❤️ and `TypeScript` by Sam-Shepsl Malikin
