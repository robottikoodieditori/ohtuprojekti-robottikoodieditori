import commService from '../services/comms'
import getErrorPositions from '../utils/getErrorPositions'
import { createSlice } from '@reduxjs/toolkit'
import { setFileName, setContent, setFileId } from './editorReducer'

const commsSlice = createSlice({
    name: 'comms',
    initialState: {
        responseFromServer: '',
        username: window.localStorage.getItem('username') || '',
        userFiles: JSON.parse(window.localStorage.getItem('userFiles')) || [],
    },
    reducers: {
        setResponseFromServer(state, action) {
            state.responseFromServer = action.payload
            console.log(`SERVER RESPONDED WITH: ${action.payload}`)
            for(var property in action.payload) {
                console.log(action.payload[property])
                // alert(property + "=" + action.payload[property]);
            }
            return state
        },
        setLoginFromServer(state, action) {
            state.username = action.payload.username
            console.log(`SERVER RESPONDED WITH NAME: ${state.username}`)
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
        setUserFiles(state, action) {
            state.userFiles = action.payload
            console.log(`SERVER RESPONDED WITH USER FILES: ${state.userFiles}`)
            return state
        },
        resetLogin(state) {
            state.username = ''
            state.userFiles = []
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('username')
            return state
        }
    }
})

export const {
    setResponseFromServer, setLoginFromServer, sendToCompiler, sendToRobot,
    setUserFiles, getUserName, resetLogin
} = commsSlice.actions


export const sendToServer = code => {
    return async dispatch => {
        let res = await commService.sendToCompile(code)
        if (res.raw_errors) {
            res = {errors: res.errors, raw_errors: getErrorPositions(res.raw_errors)}
            dispatch(setResponseFromServer(res))
        } else {
            //todo
        }
        dispatch(setResponseFromServer(res))
        console.log("SEND TO SERVER:")
        console.log(res.raw_errors)
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
        window.localStorage.setItem('token', res.token)
        window.localStorage.setItem('username', res.username)
        dispatch(setLoginFromServer(res))
    }
}

export const handleFile = (content, filename, fileId, action) => {
    console.log('aaa')
    return async dispatch => {
        const res = await commService.handleFile(content, filename, fileId, action)
        console.log(res)
        if (res.action === 'save'){
            dispatch(setFileName(filename))
            dispatch(setContent(content))
            if (res.file_id){
                console.log(res.file_id)
                dispatch(setFileId(res.file_id))
            }
        } 
        if (res.action === 'hide') {
            console.log(res)
            //todo
            //dispatch
        }
    }
}

export const getUserFiles = () => {
    return async dispatch => {
        const res = await commService.getUserFiles(window.localStorage.getItem('token'))
        console.log(res)
        if (res === 'FAIL'){
            dispatch(setUserFiles(false))
        } else {
            dispatch(setUserFiles(res))
        }
    }
}

export default commsSlice.reducer