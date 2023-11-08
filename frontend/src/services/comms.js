import axios from "axios";

const sendToCompile = async (code) => {
    const res = await axios.post('/send/compiler', {'code': code})
    return res.data
}

const sendLogin = async (username, password) => {
    const res = await axios.post('/login', {'username': username, 'password': password})
    return res.data
}

const sendFileContent = async (content, filename, token) => {
    const res = await axios.post('/user/save', {'textContent': content, 'filename': filename, 'token': token})
    return res.data
}

const getUserFiles = async ( username, password ) => {
    const res = await axios.post('/user/files', {'username': username, 'password': password})
    return res.data
}

const getFileContent = async ( username, filename) => {
    const res = await axios.post('/send/getfile', {'username':username, 'filename':filename})
    return res.data
}
export default {
    sendToCompile: sendToCompile,
    sendLogin: sendLogin,
    sendFileContent: sendFileContent,
    getUserFiles: getUserFiles,
    getFileContent: getFileContent,
}