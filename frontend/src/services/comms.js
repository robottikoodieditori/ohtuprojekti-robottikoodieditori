import axios from "axios";

const sendToCompile = async (code) => {
    const res = await axios.post('/send/compiler', {'code': code})
    return res.data
}

const sendLogin = async (username, password) => {
    try {
        const res = await axios.post('/login', {'username': username, 'password': password})
        return res.data
    } catch (e) {
        return e.response.data
    }
}

const handleFile = async (content, filename, fileId, userId, action) => {
    const res = await axios.post('/file_service', {
        'textContent': content, 'filename': filename,
        'token': window.localStorage.getItem('token'),
        'action': action,
        'fileId': fileId,
        'userId': userId
    })
    return res.data
}

const getUserFiles = async ( token ) => {
    try {
        const res = await axios.post('/get_user_files', {'token': token})
        return res.data
    } catch (e) {
        return null
    }
}

const getAllUsers = async () => {
    const res = await axios.post('/admin/get_users',
        {
            'token': window.localStorage.getItem('token')
        }
    )
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

const getPassReq = async () => {
    const res = await axios.get("/config/get")
    return res.data
}

const togglePassReq = async () => {
    const res = await axios.post("/config/password", {'token': window.localStorage.getItem('token')})
    return res.data
}

const uploadFile = async (data) => {
    const res = await axios.post('/upload', data)
    return res.data
}

const changePassword = async (userId, password) => {
    const res = await axios.post('/admin/change_password', {
        'token': window.localStorage.getItem('token'),
        'id': userId,
        'password': password
    })
    return res.data
}

const getAllFiles = async () => {
    const res = await axios.post('/admin/get_files',
        {
            'token': window.localStorage.getItem('token'),
        })
    return res.data
}

const verifyToken = async (token) => {
    try {
        const res = await axios.post('/verify_token_authenticity',
            {
                'token': token
            })
        console.log(res)
        return res        
    } catch (e) {
        return 'FAIL'
    }
}

export default {
    sendToCompile: sendToCompile,
    sendLogin: sendLogin,
    handleFile: handleFile,
    getUserFiles: getUserFiles,
    getUsers:  getAllUsers,
    uploadFile: uploadFile,
    deployToRobot: deployToRobot,
    changePassword: changePassword,
    getFiles: getAllFiles,
    getPassReq: getPassReq,
    togglePassReq: togglePassReq,
    verifyToken: verifyToken
}
