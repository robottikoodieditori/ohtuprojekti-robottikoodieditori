import { hoverTooltip } from "@codemirror/view"

export const wordHover = hoverTooltip((view, pos, side) => {
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

  return {
    pos: start,
    end,
    above: true,
    create(view) {
      let dom = document.createElement("div");
      dom.id = "::img";
      dom.style.cssText = 'color:black; width:300px; overflow:auto; word-break: break-word; border-style: solid; border: 1px;';
      console.log(view.state.doc.slice(start,end))
      dom.textContent = view.state.doc.slice(start, end) + ": Tähän tulee funktioiden dokumentaatio jatkossa"
      return { dom };
    }
  };
});