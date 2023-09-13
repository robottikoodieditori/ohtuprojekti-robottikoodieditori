import { createTheme } from '@uiw/codemirror-themes';
import {parser} from "../services/parser"
import {LRLanguage} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

let parserWithMetadata = parser.configure({
    props: [
        styleTags({
            Keyword: t.keyword,
        })
    ]
});

const Logo = LRLanguage.define({
    parser: parserWithMetadata,
    languageData: {
        commentTokens: {line: ";"}
    }
});


export const extensions = [Logo];
