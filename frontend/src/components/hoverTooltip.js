import { hoverTooltip } from "@codemirror/view"
import docs from "../services/tooltips.json"
import {parse} from 'marked';

export const wordHover = ( updateCurWord ) => hoverTooltip((view, pos, side) => {
    let { from, to, text } = view.state.doc.lineAt(pos);

    let start = pos;
    let end = pos;

    while (start > from && /\w/.test(text[start - from - 1])) {
        start--;
    }
    while (end < to && /\w/.test(text[end - from])) {
        end++;
    }
    if ((start === pos && side < 0) || (end === pos && side > 0)) {
        return null;
    }

    const word = view.state.doc.slice(start, end).toString();

    const definition = docs[word];

    if (!definition) {
        return null;
    }


    updateCurWord(word)
    /*const handleClick = () => {
        updateCurWord(word)
    }*/


    return {
        pos: start,
        end,
        above: true,
        create() {
            let container = document.createElement('div');
            //container.handleClick = handleClick()
            container.id = 'tooltip';
            'color:black; width:150px; overflow:auto; word-break: break-word; border-style: solid; border: 1px;';

            const markdown = parse(definition)
            container.innerHTML = `<small>Click word to display on sidebar</small>${markdown}`

  
            return { 
                dom: container,
            };
        },
    };
});