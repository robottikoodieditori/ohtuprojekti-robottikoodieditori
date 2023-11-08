import { createSlice } from '@reduxjs/toolkit'

const editorSlice = createSlice({
    name: 'editor',
    initialState: {
        textContent: '',
        currentlyHighlightedWord: '',
        notificationMessage: '',
        fileName: '',
    },
    reducers: {
        setContent(state, action) {
            state.textContent = action.payload
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
            state.fileName = action.payload
            console.log(`FILE NAME IS ${state.fileName}`)
            return state
        }
    }
})

export const {
    setContent, sendToCompiler, sendToRobot, setHighlightedWord,
    resetHighlightedWord, setFileName
} = editorSlice.actions


export default editorSlice.reducer