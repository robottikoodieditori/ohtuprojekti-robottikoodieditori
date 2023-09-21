import ReactDOM from 'react-dom/client';
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';

import App from './App';
import editorReducer from './reducers/editorReducer';


const store = configureStore({
    reducer: {
        editor: editorReducer
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
