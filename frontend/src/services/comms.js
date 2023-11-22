import axios from "axios";

const sendToCompile = async (code) => {
    const res = await axios.post('/send/compiler', {'code': code})
    return res.data
}

const sendLogin = async (username, password) => {
    const res = await axios.post('/login', {'username': username, 'password': password})
    return res.data
}

const handleFile = async (content, filename, fileId, userId, action) => {
    const res = await axios.post('/file', {
        'textContent': content, 'filename': filename,
        'token': window.localStorage.getItem('token'),
        'action': action,
        'fileId': fileId,
        'userId': userId
    })
    return res.data
}

const getUserFiles = async () => {
    const res = await axios.post('/files', {'token': window.localStorage.getItem('token')})
    return res.data
}

const getUsers = async () => {
    const res = await axios.get('/admin/users')
    console.log("Comms",res)
    return res.data;
}

const deployToRobot = async (content) => {
    const res = await axios.post('/deploy/robot',
        {
            'token': window.localStorage.getItem('token'),
            'content': content
        })
    return res.data
}

const uploadFile = async (data) => {
    const res = await axios.post('/upload', data)
    return res.data
}
export default {
    sendToCompile: sendToCompile,
    sendLogin: sendLogin,
    handleFile: handleFile,
    getUserFiles: getUserFiles,
    getUsers: getUsers,
    uploadFile: uploadFile,
    deployToRobot: deployToRobot
}