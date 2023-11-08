import axios from "axios";

const sendToCompile = async (code) => {
    const res = await axios.post('/send/compiler', {'code': code})
    return res.data
}

const sendLogin = async (username, password) => {
    const res = await axios.post('/login', {'username': username, 'password': password})
    return res.data
}

const sendFileContent = async (content, filename ) => {
    const res = await axios.post('/file/save', {
        'textContent': content, 'filename': filename,
        'token': window.localStorage.getItem('token')
    })
    return res.data
}

const getUserFiles = async username => {
    const res = await axios.post('/files', {
        'username': username,
        'token': window.localStorage.getItem('token')
    })
    return res.data
}

const getFileContent = async ( username, filename ) => {
    const res = await axios.post('/file', {
        'username':username, 'filename':filename,
        'token': window.localStorage.getItem('token')
    })
    return res.data
}
export default {
    sendToCompile: sendToCompile,
    sendLogin: sendLogin,
    sendFileContent: sendFileContent,
    getUserFiles: getUserFiles,
    getFileContent: getFileContent,
}