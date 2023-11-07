import axios from "axios";

const sendToCompile = async (code) => {
    const res = await axios.post('/send/compiler', {'code': code})
    return res.data
}

const sendName = async (name) => {
    const res = await axios.post('/send/name', {'name': name})
    return res.data
}

const sendFileContent = async (content, filename, username) => {
    const res = await axios.post('/send/save', {'content': content, 'filename': filename, 'username': username})
    return res.data
}

const getUserFiles = async ( username ) => {
    const res = await axios.post('/send/files', {'username': username})
    return res.data
}

const getFileContent = async ( username, filename) => {
    const res = await axios.post('/send/getfile', {'username':username, 'filename':filename})
    return res.data
}
export default {
    sendToCompile: sendToCompile,
    sendName: sendName,
    sendFileContent: sendFileContent,
    getUserFiles: getUserFiles,
    getFileContent: getFileContent,
}