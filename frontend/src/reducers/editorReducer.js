import commService from '../services/comms'
import { createSlice } from '@reduxjs/toolkit'

const editorSlice = createSlice({
    name: 'editor',
    initialState: {
        textContent: '',
        currentlyHighlightedWord: '',
        responseFromServer: ''
    },
    reducers: {
        setContent(state, action) {
            state.textContent = action.payload
            console.log(state.textContent)
            return state
        },
        sendToCompiler(state) {
            console.log(`Compile placeholder ${state}`)
            return state
        },
        sendToRobot(state) {
            console.log(`Send to robot placeholder ${state}`)
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
        setResponseFromServer(state, action) {
            state.responseFromServer = action.payload
            console.log(`SERVER RESPONDED WITH: ${action.payload}`)
            return state
        },
        sendName(state) {
            console.log(`Send to server placeholder ${state}`)
            return state
        }
    }
})

export const { 
    setContent, sendToCompiler, sendToRobot, setHighlightedWord,
    resetHighlightedWord, setResponseFromServer
} = editorSlice.actions

export const sendToServer = code => {
    return async dispatch => {
        const res = await commService.sendToCompile(code)
        dispatch(setResponseFromServer(res))
    }
}

export const sendName = code => {
    return async dispatch => {
        const res = await commService.sendName(code)
        dispatch(setResponseFromServer(res))
    }
}

export default editorSlice.reducer