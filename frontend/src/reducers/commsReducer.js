import commService from '../services/comms'
import getErrorPositions from '../utils/getErrorPositions'
import { createSlice } from '@reduxjs/toolkit'

const commsSlice = createSlice({
    name: 'comms',
    initialState: {
        responseFromServer: '',
        notificationMessage: '',
        nameFromServer: '',
    },
    reducers: {
        setResponseFromServer(state, action) {
            state.responseFromServer = action.payload
            console.log(`SERVER RESPONDED WITH: ${action.payload}`)
            return state
        },
        setNameFromServer(state, action) {
            state.nameFromServer = action.payload.name
            console.log(`SERVER RESPONDED WITH NAME: ${state.nameFromServer}`)
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
        setNotificationMessage(state, action) {
            state.notificationMessage = action.payload
            console.log(`SET NOTIFICATION MESSAGE OF: ${action.payload}`)
            return state
        },
        resetNotificationMessage(state) {
            state.notificationMessage = ''
            console.log('RESET NOTIFICATION MESSAGE')
            return state
        }
    }
})

export const {
    setResponseFromServer, setNameFromServer, sendToCompiler,
    sendToRobot, setNotificationMessage, resetNotificationMessage
} = commsSlice.actions


export const sendToServer = code => {
    return async dispatch => {
        let res = await commService.sendToCompile(code)
        if (res.raw_errors) {
            res = {errors: res.errors, raw_errors: getErrorPositions(res.raw_errors)}
        }
        dispatch(setResponseFromServer(res))
    }
}

export const sendName = code => {
    return async dispatch => {
        const res = await commService.sendName(code)
        console.log(res)
        dispatch(setNameFromServer(res))
    }
}

export default commsSlice.reducer