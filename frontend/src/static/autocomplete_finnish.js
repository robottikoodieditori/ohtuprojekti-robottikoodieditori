/**
 * autocomplete_finnish.js
 * ---------------------------------
 * 
 * Overview:
 * The `autoComplete_fi` function provides Finnish language support for an autocomplete feature in a code editor.
 * It is designed to offer Finnish keyword suggestions based on the current word being typed by the user.
 *
 * The function accepts an array of custom words (`customWords`) which can be merged with the default set of keywords.
 * It returns a function suitable for integration with code editor libraries (like CodeMirror) to provide autocomplete suggestions.
 *
 * Functionality:
 * - It checks the current context in the editor to suggest Finnish keywords.
 * - The returned function from `autoComplete_fi` examines the word before the cursor and provides relevant autocomplete options.
 * - If custom words are provided, they are concatenated with the predefined keywords, offering a broader range of suggestions.
 *
 * Usage:
 * - Import this function in components where Finnish-based autocomplete is needed.
 * - Pass an array of custom words to extend the default list of suggestions.
 * 
 * Example:
 * ```
 * import { autoComplete_fi } from './path/to/autocomplete_finnish';
 *
 * const customKeywords = ["omakustomoitu", "toinensana"];
 * const autocompleteFunction = autoComplete_fi(customKeywords);
 * // Use `autocompleteFunction` in your code editor setup
 * ```
 *
 * Note: 
 * - This function is part of a multilingual autocomplete system and can be adapted for additional languages or keyword sets.
 */

export function autoComplete_fi(customWords) {
    return (context) => {
        let word = context.matchBefore(/\w*/)
        if (word.from == word.to && !context.explicit)
            return null
        let options = [
            {label: "tulosta", type: "keyword"},
            {label: "eteen", type: "keyword"},
            {label: "et", type: "keyword"},
            {label: "taakse", type: "keyword"},
            {label: "ta", type: "keyword"},
            {label: "vasemmalle", type: "keyword"},
            {label: "va", type: "keyword"},
            {label: "oikealle", type: "keyword"},
            {label: "oi", type: "keyword"},
            {label: "jos", type: "keyword"},
            {label: "riippuen", type: "keyword"},
            {label: "olkoon", type: "keyword"},
            {label: "miten", type: "keyword"},
            {label: "valmis", type: "keyword"},
            {label: "toista", type: "keyword"},
            {label: "luvuille", type: "keyword"},
            {label: "anna", type: "keyword"},

        ]

        options = customWords.length > 0 ? options.concat(customWords) : options

        return {
            from: word.from,
            options
        }
    }
}
