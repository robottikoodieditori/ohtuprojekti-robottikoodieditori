import ReactDOM from 'react-dom/client';
import './css/index.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import App from './App';
import editorReducer from './reducers/editorReducer';
import commsReducer from './reducers/commsReducer';

/**
 * index.js
 * ---------------------------------------------------
 * 
 * Overview:
 * index.js is the entry point of the React application where the App component is rendered.
 * It sets up the Redux store for state management and wraps the App component with the Provider
 * to make the store accessible throughout the application.
 *
 * Key Functionalities:
 * - Creates a Redux store with editor and comms as reducers.
 * - Renders the App component as the root of the React application.
 * - Provides the Redux store to the entire app using the Provider component.
 *
 * Usage:
 * - This file is executed when the application starts, initializing the Redux store and rendering the App component.
 */

const store = configureStore({
    reducer: {
        editor: editorReducer,
        comms: commsReducer
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
