import { styleTags, tags as t } from "@lezer/highlight";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";

export const jsonHighlighting = styleTags({
    Keyword: t.keyword,
    String: t.string,
    Parameters: t.name,
    Command: t.number
});

const syntax_colors = syntaxHighlighting(
    HighlightStyle.define(
        [
            { tag: t.keyword, color: "red" },
            { tag: t.name, color: "red" },
            { tag: t.number, color: "green"},
            { tag: t.string, color:"Blue"},
        ]  )
);

export let syntaxStyle = [syntax_colors];