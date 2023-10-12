import commService from '../services/comms'
import { createSlice } from '@reduxjs/toolkit'

const commsSlice = createSlice({
    name: 'comms',
    initialState: {
        responseFromServer: ''
    },
    reducers: {
        setResponseFromServer(state, action) {
            state.responseFromServer = action.payload
            console.log(`SERVER RESPONDED WITH: ${action.payload}`)
            return state
        },
        setNameFromServer(state, action) {
            state.nameFromServer = action.payload
            console.log(`SERVER RESPONDED WITH NAME: ${action.payload}`)
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
    }
})

export const {
    setResponseFromServer, setNameFromServer, sendToCompiler,
    sendToRobot
} = commsSlice.actions


export const sendToServer = code => {
    return async dispatch => {
        const res = await commService.sendToCompile(code)
        dispatch(setResponseFromServer(res))
    }
}

export const sendName = code => {
    return async dispatch => {
        const res = await commService.sendName(code)
        dispatch(setNameFromServer(res))
    }
}

export default commsSlice.reducer