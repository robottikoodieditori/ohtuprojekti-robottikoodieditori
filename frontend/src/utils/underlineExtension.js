import { EditorView, Decoration } from "@codemirror/view";
import { StateField, StateEffect } from "@codemirror/state";

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