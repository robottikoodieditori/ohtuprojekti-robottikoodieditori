import React, { useState, useEffect } from "react";
import comms from "./services/comms"
import { createTheme } from '@uiw/codemirror-themes';
import CodeMirror from "@uiw/react-codemirror";
import {parser} from "./services/parser"
import {LRLanguage} from "@codemirror/language"
import { javascript } from '@codemirror/lang-javascript';
import {styleTags, tags as t} from "@lezer/highlight"

console.log(t)
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


const exampleLanguage = LRLanguage.define({
    parser: parserWithMetadata,
    languageData: {
      commentTokens: {line: ";"}
    }
  })

const myTheme = createTheme({
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


const extensions = [exampleLanguage];
  

 
function App() {
    const [data, setdata] = useState({
        name: "",
        age: 0,
        date: "",
        programming: "",
    });

    const [editorValue, changeEditorValue] = useState("")
 
    useEffect(() => {
        comms.data().then((res) => res.data).then(data =>
        {
            setdata({
                name: data.Name,
                age: data.Age,
                date: data.Date,
                programming: data.programming,
            });
        });
    }, []);

    const onChange = React.useCallback((value, viewUpdate) => {
        changeEditorValue(value)
      }, []);

 
    return (
        <div className="App">
            <header className="App-header">
                <h1>React and flask</h1>
                <p>{data.name}</p>
                <p>{data.age}</p>
                <p>{data.date}</p>
                <p>{data.programming}</p>
 
            </header>
            <CodeMirror
            theme={myTheme}
            extensions={extensions}
            onChange={onChange}
            />
        </div>
    );
}
 
export default App;