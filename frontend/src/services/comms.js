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
    console.log(content, 'asd')
    const res = await axios.post('/file_service', {
        'textContent': content, 'filename': filename,
        'token': window.localStorage.getItem('token'),
        'action': action,
        'fileId': fileId
    })
    return res.data
}

const getUserFiles = async () => {
    const res = await axios.post('/get_user_files', {'token': window.localStorage.getItem('token')})
    return res.data
}

const getAllUsers = async () => {
    const res = await axios.post('/admin/get_users',
        {
            'token': window.localStorage.getItem('token')
        }
    )
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

export default {
    sendToCompile: sendToCompile,
    sendLogin: sendLogin,
    handleFile: handleFile,
    getUserFiles: getUserFiles,
    getUsers: getAllUsers,
    deployToRobot: deployToRobot
}