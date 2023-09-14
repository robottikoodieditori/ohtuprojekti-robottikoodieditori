import {parser} from "../services/parser"
import {LRLanguage} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"


const Logo = LRLanguage.define({
    parser: parser,
    languageData: {
        commentTokens: {line: ";"}
    }
});


export const extensions = [Logo];
