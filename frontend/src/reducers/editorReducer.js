import { createSlice } from '@reduxjs/toolkit'

/**
 * editorReducer.js
 * ---------------------------------------------------
 * 
 * Overview:
 * The `editorReducer` is responsible for managing the state of the code editor in the application.
 * It uses Redux toolkit's createSlice to handle actions related to file content, file names, and highlighted words within the editor.
 *
 * Key Features:
 * - Manages the current file's content, name, and ID.
 * - Handles highlighting words within the editor.
 * - Provides functionality to reset editor state and highlighted words.
 *
 * Reducers and Actions:
 * - Contains reducers to update the state based on different actions like setContent, setHighlightedWord, resetFile, etc.
 * - Each action updates a specific part of the editor's state and persists certain values to local storage.
 *
 * Usage:
 * - Import actions from this file to dispatch them in React components where editor state needs to be managed.
 * - The reducer is combined with others in the store configuration.
 *
 * Example:
 * ```
 * import { useDispatch } from 'react-redux';
 * import { setContent, setFileName } from './editorReducer';
 *
 * const dispatch = useDispatch();
 * 
 * // Example of using the setContent action
 * dispatch(setContent(editorContent));
 *
 * // Example of using the setFileName action
 * dispatch(setFileName(fileName));
 * ```
 *
 * Note:
 * - Ensure that the editor component and any related components properly handle the state changes triggered by these actions.
 * - Local storage is used for persistence, so consider its limitations and behavior across different browser sessions.
 */

const editorSlice = createSlice({
    name: 'editor',
    initialState: {
        fileObject: {
            textContent: window.localStorage.getItem('textContent') || '',
            filename: window.localStorage.getItem('filename') || '',
            fileId: window.localStorage.getItem('fileId') || ''
        },
        currentlyHighlightedWord: '',
    },
    reducers: {
        setContent(state, action) {
            state.fileObject = {
                ...state.fileObject,
                textContent: action.payload
            }
            window.localStorage.setItem('textContent', action.payload)
            console.log(`EDITOR CONTENT: ${state.textContent}`)
            return state
        },
        setHighlightedWord(state, action) {
            state.currentlyHighlightedWord = action.payload
            console.log(`CURRENLTY HIGHLIGHTED WORD: ${state.currentlyHighlightedWord}`)
            return state
        },
        resetHighlightedWord(state) {
            state.currentlyHighlightedWord = ''
            console.log(`RESET HIGHLIGHTED WORD; VALUE NOW: ${state.currentlyHighlightedWord}`)
            return state
        },
        setFileName(state, action) {
            state.fileObject = {
                ...state.fileObject,
                filename: action.payload
            }
            window.localStorage.setItem('filename', action.payload)
            console.log(`FILE NAME IS ${state.fileName}`)
            return state
        },
        setFileId(state, action) {
            state.fileObject = {
                ...state.fileObject,
                fileId: action.payload
            }
            window.localStorage.setItem('fileId', action.payload)
            console.log(`FILE ID IS ${state.fileId}`)
            return state
        },
        resetFile(state) {
            state.fileObject = {
                textContent: '',
                filename: '',
                fileId: ''
            }
            window.localStorage.removeItem('textContent')
            window.localStorage.removeItem('filename')
            window.localStorage.removeItem('fileId')
        }
    }
})

export const {
    setContent, sendToCompiler, sendToRobot, setHighlightedWord,
    resetHighlightedWord, setFileName, setFileId, resetFile
} = editorSlice.actions


export default editorSlice.reducer