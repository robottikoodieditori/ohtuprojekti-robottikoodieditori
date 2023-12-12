import { styleTags, tags as t } from "@lezer/highlight";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";

/**
 * highlight.js
 * ---------------------------------------------------
 * 
 * Overview:
 * This file sets up custom syntax highlighting for the CodeMirror editor used in the application.
 * It defines styles for various syntax elements like keywords, strings, and numbers, enhancing the readability
 * and visual appeal of the code written in the editor.
 *
 * Key Features:
 * - jsonHighlighting: Defines style tags for different syntax elements using `@lezer/highlight`.
 * - syntax_colors: Specifies the color for each syntax element like keywords, names, numbers, and strings.
 * - syntaxStyle: An array of syntax highlighting rules that can be applied to the CodeMirror editor.
 *
 * Usage:
 * - Import `syntaxStyle` from this file and include it in the CodeMirror editor configuration to apply these styles.
 *
 * Example:
 * ```
 * import { EditorView } from "@codemirror/view";
 * import { syntaxStyle } from './highlight';
 *
 * const editor = new EditorView({
 *     extensions: [syntaxStyle, ...otherExtensions],
 *     parent: document.body
 * });
 * ```
 *
 * Note:
 * - The colors and styles are customizable. Modify the `HighlightStyle.define` array to change the appearance
 *   of different syntax elements as per your application's theme or requirements.
 */


export const jsonHighlighting = styleTags({
    Keyword: t.keyword,
    String: t.string,
    Parameters: t.name,
    Command: t.number
});

const syntax_colors = syntaxHighlighting(
    HighlightStyle.define(
        [
            { tag: t.keyword, color: "red" },
            { tag: t.name, color: "red" },
            { tag: t.number, color: "green"},
            { tag: t.string, color:"Blue"},
        ]  )
);

export let syntaxStyle = [syntax_colors];