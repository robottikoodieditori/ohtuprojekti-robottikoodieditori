import { StateEffect, StateField } from "@codemirror/state";
import { EditorView, Decoration, keymap } from "@codemirror/view";

const underlineMark = Decoration.mark({ class: "cm-underline" });

const addUnderline = StateEffect.define();

const underlineField = StateField.define({
  create: () => Decoration.none,

  update(underlines, tr) {
    underlines = underlines.map(tr.changes);

    for (let effect of tr.effects) {
      if (effect.is(addUnderline)) {
        underlines = underlines.update({
          add: [underlineMark.range(effect.value.from, effect.value.to)]
        });
      }
    }
    return underlines;
  },

  provide: (field) => EditorView.decorations.from(field)
});

let errors = [{from: 1, to: 5}]

export const seteror = (errorrrrr) => {
    errors = errorrrrr
}

function underlineSelection(view) {
  console.log("asshdashdsad")
  const errr = errors
  let effects = errr.map(({ from, to }) => addUnderline.of({ from, to }))

  if (!effects.length) return false;

  view.dispatch({ effects });
  return true;
}

const underlineTheme = EditorView.baseTheme({
  ".cm-underline": { textDecoration: "underline 3px red" }
});

const underlineKeymap = keymap.of([
  {
    key: "Mod-h",
    preventDefault: true,
    run: underlineSelection
  }
]);

export function underlines() {
  return [
    // Initialise the state field
    underlineField,
    // Apply underline styling theme
    underlineTheme,
    // Attach underlining keymap
    underlineKeymap
  ];
}