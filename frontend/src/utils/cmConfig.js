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
  })


const Logo = LRLanguage.define({
    parser: parserWithMetadata,
    languageData: {
      commentTokens: {line: ";"}
    }
  })

export const logoTheme = createTheme({
    theme: 'light',
    settings: {
      background: '#ffffff',
      foreground: '#75baff',
      caret: '#5d00ff',
      selection: '#036dd626',
      selectionMatch: '#036dd626',
      lineHighlight: '#8a91991a',
      gutterBackground: '#fff',
      gutterForeground: '#8a919966',
    },
    styles: [
      { tag: t.keyword, color: 'blue' },
    ],
  });

  export const extensions = [Logo]
