import { 
    lineNumbers, highlightActiveLine, highlightSpecialChars, dropCursor,
    rectangularSelection, crosshairCursor, EditorView 
} from "@codemirror/view"
import { history } from "@codemirror/commands"
import { bracketMatching } from '@codemirror/language'
import { closeBrackets } from '@codemirror/autocomplete'
import { LRLanguage, foldGutter } from "@codemirror/language"
import { parser } from "./parser"
import { underlines } from "./underlineExtension"
import { syntaxStyle } from "./highlight"

/**
 * cmConfig.js
 * ---------------------------------------------------
 * 
 * Overview:
 * This file configures the CodeMirror editor used in the application. It includes various extensions and
 * settings to enhance the editor's functionality and appearance.
 *
 * Key Extensions and Features:
 * - lineNumbers: Adds line numbers to the editor.
 * - highlightActiveLine: Highlights the line where the cursor is located.
 * - highlightSpecialChars: Highlights special characters in the editor.
 * - dropCursor, rectangularSelection, crosshairCursor: Enhances cursor functionality for better editing experience.
 * - bracketMatching, closeBrackets: Provides automatic bracket matching and closing.
 * - foldGutter: Adds the ability to fold and unfold code sections.
 * - History: Configures the undo/redo history feature.
 * - Logo: Defines a custom language parser for the editor (from `parser.js`).
 * - syntaxStyle: Applies custom syntax styling (from `highlight.js`).
 * - fixedHeightEditor: Applies a theme for a fixed height editor view.
 * - underlines: Integrates an underline extension for text decoration (from `underlineExtension.js`).
 *
 * Usage:
 * - Import `extensions` from this file and apply them when initializing the CodeMirror editor instance.
 *
 * Example:
 * ```
 * import { EditorView } from "@codemirror/view";
 * import { extensions } from './cmConfig';
 *
 * const editor = new EditorView({extensions, parent: document.body});
 * ```
 */

const Logo = LRLanguage.define({
    parser: parser,
    languageData: {
        commentTokens: {line: ";"}
    }
});

const History = history({
    minDepth: 100,
    newGroupDelay: 175
})

const fixedHeightEditor = EditorView.theme({
    "&": {height: '26vw', width: '75vw'},
    '.cm-scroller': {overflow: 'auto'}
})


export const extensions = [
    // basic setup extensions:
    lineNumbers(), highlightActiveLine(), highlightSpecialChars(), 
    dropCursor(), bracketMatching(), closeBrackets(), rectangularSelection(),
    crosshairCursor(), foldGutter(),
    // language, syntax and editor configurations
    History, Logo, syntaxStyle, fixedHeightEditor,
    // custom extensions:
    underlines()
]

