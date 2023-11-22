import { hoverTooltip } from "@codemirror/view"
import docs from "../static/tooltips.json"
import { parse } from 'marked';
import en from '../utils/en';
import fi from '../utils/fi';

export const wordHover = ( updateCurWord, errorListRef, language ) => hoverTooltip((view, pos, side) => {
    const translations = language.current === 'fi' ? fi : en;

    let { from, to, text } = view.state.doc.lineAt(pos);

    let start = pos;
    let end = pos;

    while (start > from && /[\wäöåÄÖÅ]/.test(text[start - from - 1])) {
        start--;
    }
    while (end < to && /[\wäöåÄÖÅ]/.test(text[end - from])) {
        end++;
    }
    if ((start === pos && side < 0) || (end === pos && side > 0)) {
        return null;
    }

    const word = view.state.doc.slice(start, end).toString();
    let definition = ''
    let errorWord = ''

    const errorList = errorListRef.current
    if (errorList)  {
        errorWord = errorList.find((error) => error.from === start && error.to === end)
    }

    if (!docs[language.current][word] && !errorWord) {
        return null;
    }

    if (docs[language.current][word] && !errorWord) {
        definition = docs[language.current][word]
        updateCurWord(word)
    } else {
        language.current === 'fi'
            ? definition = errorWord.fin
            : definition = errorWord.eng
    }


    return {
        pos: start,
        end,
        above: true,
        create() {
            let container = document.createElement('div');
            container.id = 'tooltip';
            'color:black; width:150px; overflow:auto; word-break: break-word; border-style: solid; border: 1px;';

            const markdown = parse(definition)
            if (!errorWord) {
                container.innerHTML = `<small>${translations?.tooltipOpenSidebar}</small>${markdown}`
            } else {
                container.innerHTML = markdown
            }


            return {
                dom: container,
            };
        },
    };
});