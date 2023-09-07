import { defineMode } from 'codemirror';

function customJSMode(config, parserConfig) {
    return {
      token(stream) {
        // Define an array of specific words you want to highlight
        const customWords = ['example', 'word', 'highlight'];      // Check if the current word in the stream is in the customWords array
        if (customWords.includes(stream.current())) {
          return 'custom-word'; // You can define a custom CSS class for styling
        }      // If not, proceed with regular JavaScript tokenization
        // You can use CodeMirror's existing JavaScript mode for this
        return null;
      },
    };
  }// Register the custom mode
defineMode('custom-javascript', customJSMode);
