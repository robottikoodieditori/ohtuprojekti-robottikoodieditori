import commService from '../services/comms'
import getErrorPositions from '../utils/getErrorPositions'
import { createSlice } from '@reduxjs/toolkit'
import { setFileName, setContent, setFileId } from './editorReducer'

const commsSlice = createSlice({
    name: 'comms',
    initialState: {
        userObject: {
            username: window.localStorage.getItem('username') || '',
            userFiles: JSON.parse(window.localStorage.getItem('userFiles')) || [],
            token: window.localStorage.getItem('token') || '',
            userRole: window.localStorage.getItem('userRole') || '',
        },
        responseFromServer: '',
        passReq: window.localStorage.getItem("passReq") || true,
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
            state.userObject = {
                ...state.userObject,
                username: action.payload.username,
                token: action.payload.token,
                userRole: action.payload.role.toString()
            }
            window.localStorage.setItem('username', action.payload.username)
            window.localStorage.setItem('token', action.payload.token)
            window.localStorage.setItem('userRole', action.payload.role)
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
            state.userObject = {
                ...state.userObject,
                userFiles: action.payload
            }
            window.localStorage.setItem('userFiles', JSON.stringify(action.payload))
            console.log(`SERVER RESPONDED WITH USER FILES: ${state.userFiles}`)
            return state
        },
        logout(state) {
            state.userObject = {
                username: '',
                userFile: [],
                token: '',
                userRole: '',
            }
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('username')
            window.localStorage.removeItem('userFiles')
            window.localStorage.removeItem('userRole')
            return state
        },
        setPassReq(state, action) {
            state.passReq = action.payload
            window.localStorage.setItem("passReq", action.payload)
        },
        removeFile(state, action) {
            state.userObject = {
                ...state.userObject,
                userFiles: state.userObject.userFiles.filter(file => file.id !== action.payload)
            }
            return state
        },
        addUserFile(state, action) {
            const currentDate = new Date()
            const timeStamp = currentDate.getTime()
            state.userObject = {
                ...state.userObject,
                userFiles: state.userObject.userFiles.concat({
                    filename: action.payload.filename,
                    textContent: action.payload.content,
                    created: timeStamp,
                    last_updated: timeStamp
                })
            }
            return state
        }
    }
})

export const {
    setResponseFromServer, setLoginFromServer, sendToCompiler, sendToRobot,
    setUserFiles, getUserName, logout, setPassReq, removeFile, addUserFile
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

export const deployToRobot = code => {
    return async dispatch => {
        const res = await commService.deployToRobot(code)
        dispatch(sendToRobot(res))
    }
}


export const login = (username, password) => {
    return async dispatch => {
        const curpas = password || 'password'
        const res = await commService.sendLogin(username, curpas)
        if (res === 'Invalid Credentials') {
            dispatch(setResponseFromServer({'login': 'FAIL'}))
        } else {
            dispatch(setLoginFromServer(res))
            dispatch(setResponseFromServer({'login': 'OK'}))
        }
    }
}


export const saveNew = (content, filename, token) => {
    return async dispatch => {
        const res = await commService.saveNew(content, filename, token)
        dispatch(setFileName(filename))
        dispatch(setContent(content))
        if (res.file_id) {
            dispatch(setFileId(res.file_id))
        }
        dispatch(addUserFile({content, filename}))
    }
}

export const saveExisting = ( content, filename, token ) => {
    return async dispatch => {
        const res = await commService.saveExisting(content, filename, token)
        if (res) {
            dispatch(addUserFile({content, filename}))
            dispatch(setContent(content))
        }
    }
}

export const hideFile = (fileId, token) => {
    return async dispatch => {
        const res = await commService.hideFile(fileId, token)
        console.log(res)
        dispatch(removeFile(fileId))
    }
}

export const getUserFiles = ( token ) => {
    return async dispatch => {
        const res = await commService.getUserFiles(token)
        if (res === 'FAIL'){
            dispatch(setUserFiles([]))
        } else {
            dispatch(setUserFiles(res))
        }
    }
}

export const getPassRequired = () => {
    return async dispatch => {
        const res = await commService.getPassReq()
        dispatch(setPassReq(res))
    }
}

export const togglePassRequired = ( token ) => {
    return async dispatch => {
        const res = await commService.togglePassReq(token)
        dispatch(setPassReq(res.passReq))
    }
}

export const verifyLogin = (token) => {
    return async dispatch => {
        const res = await commService.verifyToken(token)
        if (res === 'FAIL') {
            dispatch(logout())
        }
    }
}

export default commsSlice.reducer