/**
 * getCustomKeywords.js
 * ---------------------------------------------------
 * 
 * Overview:
 * The `getCustomKeywords` function parses a given text content to extract custom-defined keywords.
 * This utility is particularly useful for extending the autocomplete suggestions in a code editor with
 * user-defined or context-specific keywords.
 *
 * Functionality:
 * - Parses each line of the provided text content.
 * - Identifies and extracts words following specific markers (e.g., 'miten', 'to') as custom keywords.
 * - Returns an array of objects, each representing a custom keyword with a label and type.
 *
 * Usage:
 * - Use this function to generate a list of custom keywords from a text (like the editor's content),
 *   which can then be fed into an autocomplete system.
 *
 * Example:
 * ```
 * const editorContent = "miten exampleKeyword\nanother line";
 * const customKeywords = getCustomKeywords(editorContent);
 * // customKeywords would be [{ label: "exampleKeyword", type: "keyword" }]
 * ```
 *
 * Note:
 * - The function currently identifies keywords based on specific markers. If needed, modify or expand
 *   the logic to suit different patterns or language constructs.
 */

function getCustomKeywords(textContent) {
    
    let keywords = [];
    const substrings = textContent.split('\n')

    substrings.forEach(substring => {
        const newString = substring.split(' ')
        if (newString.length > 1) {
            if (newString[0] === 'miten' || newString[0] === 'to') {
                keywords.push({label:newString[1], type:'keyword'})
                console.log(`Registered ${newString[1]} as keyword`)
            }
        }
    })


    return keywords
}

export default getCustomKeywords