import React, { useState, useEffect } from "react";
import comms from "./services/comms"

import { createTheme } from '@uiw/codemirror-themes';
import CodeMirror from "@uiw/react-codemirror";
import {parser} from "./services/parser"
import {LRLanguage} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

let parserWithMetadata = parser.configure({
    props: [
      styleTags({
        Keyword: t.keyword,
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
      { tag: t.keyword, color: 'blue' },
    ],
  });


const extensions = [exampleLanguage];
  

function App() {
    const [data, setdata] = useState({
        date: "",
    });


    useEffect(() => {
        comms.getData().then((res) => res.data).then(data =>
        {
            setdata({
                date: data.Date,
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
                <p>{data.date}</p>
 
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