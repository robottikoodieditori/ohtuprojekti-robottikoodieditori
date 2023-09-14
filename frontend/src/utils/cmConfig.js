import {parser} from "../services/parser"
import {LRLanguage} from "@codemirror/language"


const Logo = LRLanguage.define({
    parser: parser,
    languageData: {
        commentTokens: {line: ";"}
    }
});


export const extensions = [Logo];
