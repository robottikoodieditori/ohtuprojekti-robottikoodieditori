import { basicSetup, EditorView } from '@uiw/react-codemirror'
import { EditorState, Compartment } from '@codemirror/state'
import {javascript} from '@codemirror/lang-javascript'
import { wordHover } from "../components/hoverTooltip"
import { extensions as highlight } from '../services/highlight';
import { extensions } from "./cmConfig";


let language = new Compartment, tabSize = new Compartment


export function createView({ doc, parent }) {   
    let state = EditorState.create({
        extensions: [
            basicSetup(),
            extensions,
            tabSize.of(EditorState.tabSize.of(8)),
            wordHover,
            highlight
        ]
    })

    return new EditorView({ state, parent })
    
}
