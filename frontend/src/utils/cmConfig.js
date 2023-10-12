import {parser} from "../services/parser"
import {LRLanguage} from "@codemirror/language"


const Logo = LRLanguage.define({
    parser: parser,
    languageData: {
        commentTokens: {line: ";"}
    }
});

export const options = {
    tabSize: 4,
    indentUnit: 4,
    Tab: (cm) => {
        const tabSize = cm.getOption('tabSize');
        const tabCharacter = ' '.repeat(tabSize);
        const cursor = cm.getCursor();
        console.log(cursor)
        cm.replaceSelection(tabCharacter);
        cm.setCursor({ line: cursor.line, ch: cursor.ch + tabCharacter.length });
    }
}


export const extensions = [Logo];

