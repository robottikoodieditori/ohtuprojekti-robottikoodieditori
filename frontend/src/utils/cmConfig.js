import { parser } from "../services/parser";
import { createTheme } from '@uiw/codemirror-themes';
import { LRLanguage } from '@codemirror/language';
import {styleTags, tags as t} from '@lezer/highlight';

let parserWithMetadata = parser.configure({
    props: [
      styleTags({
        Identifier: t.variableName,
        Boolean: t.bool,
        Number: t.number,
        String: t.string,
        Null: t.null,
        Command: t.command,
        LineComment: t.lineComment,
        Name: t.name,
        "( )": t.paren
      })
    ]
  })

  const Logo = LRLanguage.define({
    parser: parserWithMetadata,
    languageData: {
        commentTokens: {line: ';'}
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
      { tag: t.comment, color: 'red' },
      { tag: t.variableName, color: 'red' },
      { tag: [t.string, t.special(t.brace)], color: 'red' },
      { tag: t.name, color: "red"},
      { tag: t.number, color: 'green' },
      { tag: t.bool, color: 'red' },
      { tag: t.null, color: 'red' },
      { tag: t.keyword, color: 'green' },
      { tag: t.operator, color: 'red' },
      { tag: t.className, color: 'red' },
      { tag: t.definition(t.typeName), color: 'red' },
      { tag: t.typeName, color: 'red' },
      { tag: t.angleBracket, color: 'red' },
      { tag: t.tagName, color: 'red' },
      { tag: t.attributeName, color: 'red' },
    ],
  });

  export const extensions = [Logo]
