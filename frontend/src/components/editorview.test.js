import React from 'react'
import { render, screen } from '@testing-library/react'
import EditorView from './editorview'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import editorReducer from '../reducers/editorReducer';

const store = createStore(editorReducer)

test('renders content', () => {

    render(
        <Provider store={store}>
            <EditorView data={'12.3'} />
        </Provider>
    )

    const element = screen.getByText('Koodieditori')
    expect(element).toBeDefined()
})