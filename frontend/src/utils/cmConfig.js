import { lineNumbers, highlightActiveLine, highlightSpecialChars, dropCursor, rectangularSelection, crosshairCursor, EditorView } from "@codemirror/view"
import { history } from "@codemirror/commands"
import { bracketMatching } from '@codemirror/language'
import { closeBrackets } from '@codemirror/autocomplete'
import {parser} from "../services/parser"
import {LRLanguage, foldGutter } from "@codemirror/language"


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
    "&": {height: '26vw', width: '70vw'},
    '.cm-scroller': {overflow: 'auto'}
})


export const extensions = [
    Logo, lineNumbers(), highlightActiveLine(), highlightSpecialChars(), History,
    dropCursor(), bracketMatching(), closeBrackets(), rectangularSelection(),
    crosshairCursor(), foldGutter(), fixedHeightEditor
]

