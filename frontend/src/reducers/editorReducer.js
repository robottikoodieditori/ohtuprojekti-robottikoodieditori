import { createSlice } from '@reduxjs/toolkit'

const editorSlice = createSlice({
    name: 'editor',
    initialState: {
        textContent: '',
        currentlyHighlightedWord: '',
    },
    reducers: {
        setContent(state, action) {
            state.textContent = action.payload
            console.log(state.textContent)
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
    }
})

export const {
    setContent, sendToCompiler, sendToRobot, setHighlightedWord,
    resetHighlightedWord
} = editorSlice.actions


export default editorSlice.reducer