import axios from "axios";

const sendToCompile = async (code) => {
    const res = await axios.post('/send/compiler', {'code': code})
    return res.data
}

const sendLogin = async (username, password) => {
    const res = await axios.post('/login', {'username': username, 'password': password})
    return res.data
}

const handleFile = async (content, filename, fileId, action) => {
    const res = await axios.post('/file', {
        'textContent': content, 'filename': filename,
        'token': window.localStorage.getItem('token'),
        'action': action,
        'fileId': fileId
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

const uploadFile = async (file) => {
    console.log(file)
    const res = await axios.post('/upload', file)
    return res.data
}
export default {
    sendToCompile: sendToCompile,
    sendLogin: sendLogin,
    handleFile: handleFile,
    getUserFiles: getUserFiles,
    getUsers: getUsers,
    uploadFile: uploadFile
}