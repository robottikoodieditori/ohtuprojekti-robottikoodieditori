import axios from "axios";

const sendToCompile = async (code) => {
    const res = await axios.post('/send/compiler', {'code': code})
    return res.data
}

const sendLogin = async (username, password) => {
    const res = await axios.post('/login', {'username': username, 'password': password})
    return res.data
}

const handleFile = async (content, filename, action) => {
    console.log(content, 'asd')
    const res = await axios.post('/file', {
        'textContent': content, 'filename': filename,
        'token': window.localStorage.getItem('token'),
        'action': action
    })
    return res.data
}

const getUserFiles = async () => {
    const res = await axios.post('/files', {'token': window.localStorage.getItem('token')})
    return res.data
}

export default {
    sendToCompile: sendToCompile,
    sendLogin: sendLogin,
    handleFile: handleFile,
    getUserFiles: getUserFiles,
}