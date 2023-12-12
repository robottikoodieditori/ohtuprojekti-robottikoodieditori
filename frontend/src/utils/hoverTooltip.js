import { hoverTooltip } from "@codemirror/view"
import docs from "../static/tooltips.json"
import { parse } from 'marked';
import en from '../static/en';
import fi from '../static/fi';

/**
 * hoverTooltip.js
 * ---------------------------------------------------
 * 
 * Overview:
 * This file defines a `wordHover` function that integrates with CodeMirror's `hoverTooltip` feature.
 * It's used to display tooltips when the user hovers over certain words in the editor. These tooltips can 
 * show definitions, translations, or error messages associated with the hovered word.
 *
 * Key Features:
 * - Dynamically identifies words under the cursor and displays a tooltip with relevant information.
 * - Supports multilingual tooltips (Finnish and English) by integrating with `fi.js` and `en.js`.
 * - Can display error messages from a provided error list.
 * - Uses the `marked` library to parse and display markdown content in tooltips.
 *
 * Usage:
 * - Import `wordHover` and use it as an extension in CodeMirror editor setup.
 * - Provide an array of error objects and the current language setting for contextual tooltips.
 *
 * Example:
 * ```
 * import { wordHover } from './hoverTooltip';
 * import { EditorView } from "@codemirror/view";
 *
 * const editor = new EditorView({
 *     extensions: [wordHover(updateCurrentWord, errorListRef, languageRef), ...otherExtensions],
 *     parent: document.body
 * });
 * ```
 *
 * Note:
 * - The tooltip content is sourced from a static JSON file (`tooltips.json`) and error list references.
 * - The function can be extended or modified to include additional tooltip content or styling.
 */

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