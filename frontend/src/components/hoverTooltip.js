import { hoverTooltip } from "@codemirror/view"
import docs from "../services/tooltips.json"
import ReactMarkdown from "react-markdown";
import { createRoot } from 'react-dom/client';

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

  const word = view.state.doc.slice(start, end).toString();

  const definition = docs[word];

  if (!definition) {
    return null;
  }

  return {
    pos: start,
    end,
    above: true,
    create(view) {
      let container = document.createElement('div');
      container.id = '::img';
      container.style.cssText =
        'color:black; width:150px; overflow:auto; word-break: break-word; border-style: solid; border: 1px;';
  
      // Create a root and render the ReactMarkdown component inside it
      const root = createRoot(container);
      root.render(<ReactMarkdown>{definition}</ReactMarkdown>);
  
      return { dom: container };
    },
  };
});