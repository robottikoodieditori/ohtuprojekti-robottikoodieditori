import { styleTags, tags as t } from "@lezer/highlight";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";

export const jsonHighlighting = styleTags({
    Keyword: t.keyword,
    String: t.string,
    Parameters: t.name,
});

// A very dim/dull syntax highlighting so you have something to look at, but also to trigger you to write your own ;)
// Also shows that you can use `export let extension = [...]`, to add extensions to the "demo text" editor.

const syntax_colors = syntaxHighlighting(
    HighlightStyle.define(
        [
            { tag: t.keyword, color: "red" },
            { tag: t.name, color: "red" },
            { tag: t.number, color: "green"},
            { tag: t.string, color:"Blue"},
        ]  )
);

export let extensions = [syntax_colors];