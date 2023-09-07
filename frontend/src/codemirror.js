import React from 'react';
import { Controlled as CodeMirror } from '@uiw/react-codemirror';
import 'codemirror/mode/javascript/javascript'; // Import the JavaScript mode
const Editor = (props) => {
  const customJSMode = {
    name: 'custom-javascript', // Name for your custom mode
    token: (stream) => {
      const customWords = ['example', 'word', 'highlight'];      if (customWords.includes(stream.current())) {
        return 'custom-word';
      }      // Use the default JavaScript mode for other tokens
      return null;
    },
  };  return (
    <div>
      <CodeMirror
        value={props.code} // Set the initial code value from props
        options={{
          mode: customJSMode, // Use the custom mode here
          theme: 'default', // You can specify your desired theme
          lineNumbers: true, // Enable line numbers if needed
        }}
        onBeforeChange={(editor, data, value) => {
          // Update the code value in the parent component
          props.eventHandler(value);
        }}
      />
    </div>
  );
};export default Editor;