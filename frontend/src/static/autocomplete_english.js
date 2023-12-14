/**
 * autocomplete_english.js
 * ---------------------------------
 * 
 * The `autoComplete_en` function provides a set of English language keywords for use in an autocomplete feature.
 * It's designed to be integrated with a code editor's autocomplete mechanism, offering suggestions for common coding
 * keywords in English.
 *
 * The function takes an array of custom words (`customWords`) which can be used to extend the default keyword list.
 * It returns a function that conforms to the expected format for autocomplete functions, suitable for use with
 * libraries like CodeMirror.
 *
 * The returned function takes a context object from the editor and provides a list of autocomplete suggestions
 * based on the current word being typed. It includes both the predefined set of keywords and any custom words provided.
 *
 * Usage:
 * - Import this function into components where an English-based autocomplete feature is required.
 * - Pass an array of custom words if customization is needed; otherwise, the default keyword list is used.
 * 
 * Example:
 * ```
 * import { autoComplete_en } from './path/to/autocomplete_english';
 *
 * const customKeywords = ["customWord1", "customWord2"];
 * const autocompleteFunction = autoComplete_en(customKeywords);
 * // Now use `autocompleteFunction` with your code editor setup
 * ```
 *
 * Note: 
 * - The function can be easily adapted or expanded for additional keywords or different coding languages.
 */

export function autoComplete_en(customWords) {
    return (context) => {
        let word = context.matchBefore(/\w*/)
        if (word.from == word.to && !context.explicit)
            return null
        let options = [
            {label: "show", type: "keyword"},
            {label: "forward", type: "keyword"},
            {label: "fd", type: "keyword"},
            {label: "backward", type: "keyword"},
            {label: "bk", type: "keyword"},
            {label: "left", type: "keyword"},
            {label: "lt", type: "keyword"},
            {label: "right", type: "keyword"},
            {label: "rt", type: "keyword"},
            {label: "if", type: "keyword"},
            {label: "ifelse", type: "keyword"},
            {label: "make", type: "keyword"},
            {label: "to", type: "keyword"},
            {label: "end", type: "keyword"},
            {label: "repeat", type: "keyword"},
            {label: "for", type: "keyword"},
            {label: "output", type: "keyword"},

        ]

        options = customWords.length > 0 ? options.concat(customWords) : options

        return {
            from: word.from,
            options
        }
    }
}
