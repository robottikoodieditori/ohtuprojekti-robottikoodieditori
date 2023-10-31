import ReactDOM from 'react-dom/client';
import './css/index.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';

import App from './App';
import editorReducer from './reducers/editorReducer';
import commsReducer from './reducers/commsReducer';


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
