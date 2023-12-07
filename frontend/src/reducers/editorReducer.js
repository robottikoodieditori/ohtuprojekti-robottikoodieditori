import { createSlice } from '@reduxjs/toolkit'

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