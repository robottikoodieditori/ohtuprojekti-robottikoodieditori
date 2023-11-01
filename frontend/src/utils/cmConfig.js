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

