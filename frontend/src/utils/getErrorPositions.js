/**
 * getErrorPositions.js
 * ---------------------------------------------------
 * 
 * Overview:
 * `getErrorPositions` is a utility function that converts an array of error objects into a format
 * suitable for visual error display in a code editor. It's primarily used to extract and transform
 * error position data (like line and column numbers) from error messages.
 *
 * Functionality:
 * - Takes an array of error objects (errorList) as input.
 * - Each error object is expected to have 'start' and 'end' properties indicating the error's position,
 *   and 'eng' and 'fin' properties for error messages in English and Finnish.
 * - Converts these details into a new list where each entry is an object with 'from', 'to', 'eng', and 'fin' properties.
 *
 * Usage:
 * - Useful for integrating with syntax checking or linting tools that output error messages with positional data.
 * - The output can be used to highlight errors in the code editor or display error messages.
 *
 * Example:
 * ```
 * const errorsFromCompiler = [
 *   { start: 10, end: 20, eng: "Unexpected token", fin: "Odottamaton merkki" },
 *   { start: 30, end: 40, eng: "Missing semicolon", fin: "Puuttuva puolipiste" }
 * ];
 * const errorPositions = getErrorPositions(errorsFromCompiler);
 * // errorPositions would be a formatted array of error position objects
 * ```
 */

export default function getErrorPositions(errorList) {
    let newList = []
    errorList.map((r) => newList.push({from: Number(r.start), to: Number(r.end), eng: String(r.eng), fin: String(r.fin)}))
    return newList
}