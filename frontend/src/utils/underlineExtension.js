import { EditorView, Decoration } from "@codemirror/view";
import { StateField, StateEffect } from "@codemirror/state";

/**
 * underlineExtension.js
 * ---------------------------------------------------
 * 
 * Overview:
 * This file contains utilities for adding and clearing underline decorations in the CodeMirror editor.
 * It is useful for highlighting specific parts of the text, such as indicating errors or important sections.
 *
 * Key Components:
 * - addUnderlineEffect: A StateEffect to add underlines in the editor.
 * - clearUnderlineEffect: A StateEffect to clear all underlines.
 * - underlineField: A StateField to manage the underline decorations' state.
 * - underlineMark: Defines the style for underline decorations.
 * - underlineTheme: Applies a base theme for underlines.
 *
 * Usage:
 * - Use `underlineSelection` to add underlines to specified text ranges.
 * - Use `clearUnderlines` to remove all underlines from the editor.
 * - The `underlines` function provides the necessary extensions for the editor setup.
 *
 * Example:
 * ```
 * import { underlineSelection, clearUnderlines, underlines } from './underlineExtension';
 * import { EditorView } from "@codemirror/view";
 *
 * const editor = new EditorView({
 *     extensions: [underlines(), ...otherExtensions],
 *     parent: document.body
 * });
 *
 * // To underline text
 * underlineSelection(editor, [{ from: 10, to: 20 }]);
 *
 * // To clear underlines
 * clearUnderlines(editor);
 * ```
 *
 * Note:
 * - The underlining style can be customized by modifying `underlineMark` and `underlineTheme`.
 */


const addUnderlineEffect = StateEffect.define();
const clearUnderlineEffect = StateEffect.define();
const underlineField = StateField.define({
    create() {
        return Decoration.none;
    },

    update(underlines, tr) {
        underlines = underlines.map(tr.changes);

        for (let e of tr.effects) {
            if (e.is(clearUnderlineEffect)) {
                return Decoration.none
            }
        }

        for (let e of tr.effects) {
            if (e.is(addUnderlineEffect)) {
                if (e.value.from === e.value.to) {
                    e.value.to = e.value.from + 1
                }

                underlines = underlines.update({
                    add: [underlineMark.range(e.value.from, e.value.to)]
                });
            }
        }

        return underlines;
    },

    provide: (f) => EditorView.decorations.from(f)
});

const underlineMark = Decoration.mark({ class: "cm-underline" });
const underlineTheme = EditorView.baseTheme({
    ".cm-underline": { textDecoration: "underline 3px red" }
});

export function underlineSelection(view, selectionList) {
    const effects = selectionList.map(({ from, to }) => addUnderlineEffect.of({ from, to }));
    if (!effects.length) return false;

    if (!view.state.field(underlineField, false)) {
        effects.push(StateEffect.appendConfig.of([underlineField, underlineTheme]));
    }

    view.dispatch(view.state.update({ effects }));
    return true;
}

export function underlines() {
    return [
        underlineField,
        underlineTheme
    ]
}

export function clearUnderlines(view) {
    view.dispatch(view.state.update({ effects: clearUnderlineEffect.of() }))
}