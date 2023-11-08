import commService from '../services/comms'
import getErrorPositions from '../utils/getErrorPositions'
import { createSlice } from '@reduxjs/toolkit'

const commsSlice = createSlice({
    name: 'comms',
    initialState: {
        responseFromServer: '',
        notificationMessage: '',
        nameFromServer: window.localStorage.getItem('username') || '',
        fileContentFromServer: '',
        userFilesFromServer: false,
    },
    reducers: {
        setResponseFromServer(state, action) {
            state.responseFromServer = action.payload
            console.log(`SERVER RESPONDED WITH: ${action.payload}`)
            return state
        },
        setLoginFromServer(state, action) {
            state.nameFromServer = action.payload.username
            console.log(`SERVER RESPONDED WITH NAME: ${state.nameFromServer}`)
            window.localStorage.setItem('token', action.payload.token)
            window.localStorage.setItem('username', action.payload.username)

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
        },
        setFileContentFromServer(state, action) {
            state.fileContentFromServer = action.payload.textContent
            console.log(`SERVER RESPONDED WITH FILE CONTENT: ${state.fileContentFromServer}`)
            return state
        },
        setUserFilesFromServer(state, action) {
            state.userFilesFromServer = action.payload
            console.log(`SERVER RESPONDED WITH USER FILES: ${state.userFilesFromServer}`)
            return state
        },
        resetLogin(state) {
            state.nameFromServer = ''
            state.UserFilesFromServer = ''
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('username')
            return state
        }
    }
})

export const {
    setResponseFromServer, setLoginFromServer, sendToCompiler,
    sendToRobot, setNotificationMessage, resetNotificationMessage,
    setFileContentFromServer, setUserFilesFromServer, getUserName,
    resetLogin
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

export const logout = () => {
    return async dispatch => (
        dispatch(resetLogin())
    )
}

export const login = username => {
    const password = 'password'
    return async dispatch => {
        const res = await commService.sendLogin(username, password)
        console.log(res)
        dispatch(setLoginFromServer(res))
    }
}

export const saveFile = (content, filename) => {
    return async dispatch => {
        const res = await commService.sendFileContent(content, filename, window.localStorage.getItem('token'))
        console.log(res)
        dispatch(setNotificationMessage(res))
    }
}

export const getUserFiles = (username) => {
    return async dispatch => {
        const password = 'password'
        const res = await commService.getUserFiles(username, password)
        console.log(res)
        if (res === 'FAIL'){
            dispatch(setUserFilesFromServer(false))
        } else {
            dispatch(setUserFilesFromServer(res))
        }
    }
}

export const getFileContent = (username, filename) => {
    return async dispatch => {
        const password = 'password'
        const res = await commService.getUserFiles(username, password)
        const file = res.find(file => file.filename === filename) 
        if (file) {
            dispatch(setFileContentFromServer(file))
        } else {
            dispatch(setFileContentFromServer(''))
        }
    }
}

export default commsSlice.reducer