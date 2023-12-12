import axios from "axios";

/**
 * comms.js
 * ---------------------------------------------------
 * 
 * Overview:
 * The `comms.js` file contains functions for making HTTP requests to the backend server.
 * It uses axios for handling these requests and covers a wide range of functionalities including
 * user authentication, file operations, and configurations.
 *
 * Key Functions:
 * - sendToCompile: Sends code to the server for compilation.
 * - sendLogin: Handles user login requests.
 * - saveNew, saveExisting: Save new or existing files.
 * - hideFile: Hides (effectively deletes) a file on the server.
 * - getUserFiles, getAllUsers: Retrieves user files or user details.
 * - deployToRobot: Deploys code to a robot.
 * - getPassReq, togglePassReq: Gets or toggles password requirement settings.
 * - uploadFile: Uploads a file to the server.
 * - changePassword: Changes a user's password.
 * - getAllFiles: Retrieves all files (admin functionality).
 * - verifyToken: Verifies the authenticity of a user token.
 * - adminSaveFile, deleteFile: Admin-specific file operations.
 *
 * Usage:
 * - Import the required functions from this file and use them to interact with the backend server.
 *
 * Example:
 * ```
 * import comms from './comms';
 *
 * // Example of sending code to the compiler
 * const response = await comms.sendToCompile(code);
 * ```
 *
 * Note:
 * - Ensure that the backend server's endpoints match the ones used in these functions.
 * - Handle responses and errors appropriately where these functions are used.
 */


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


const saveNew = async (content, filename, token) => {

    const res = await axios.post("/files/save", {
        'textContent': content,
        'filename': filename
    }, {
        headers: {
            'Authorization': `bearer ${token}`
        },
    }
    )
    return res.data
}

const saveExisting = async (content, filename, token) => {

    const res = await axios.put("/files/save", {
        'textContent': content,
        'filename': filename
    }, {
        headers: {
            'Authorization': `bearer ${token}`
        },
    }
    )
    return res.data
}

const hideFile = async ( fileId, token ) => {
    const res = await axios.put("/files/hide", {
        'fileId': fileId
    }, {
        headers: {
            'Authorization': `bearer ${token}`
        },
        'fileId': fileId
    })
    return res.data
}

const getUserFiles = async ( token ) => {
    try {
        const res = await axios.get('/get_user_files', {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        return res.data
    } catch (e) {
        return null
    }
}

const getAllUsers = async ( token ) => {
    const res = await axios.get('/admin/get_users', {
        headers: {
            'Authorization': `bearer ${token}`
        }
    }
    )
    return res.data;
}

const deployToRobot = async ( content, token ) => {
    const res = await axios.post('/deploy/robot', {
        'content': content,
    }, {
        headers: {
            'Authorization': `bearer ${token}`
        },
    })
    return res.data
}

const getPassReq = async () => {
    const res = await axios.get("/config/get")
    return res.data
}

const togglePassReq = async ( token ) => {
    const res = await axios.post("/config/password", {'token': token})
    return res.data
}

const uploadFile = async ( data ) => {
    const res = await axios.post('/files/upload', data)
    return res.data
}

const changePassword = async ( userId, password, token ) => {
    const res = await axios.put('/admin/change_password', {
        'id': userId,
        'password': password
    }, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    }
    )
    return res.data
}

const getAllFiles = async ( token ) => {
    const res = await axios.get('/admin/get_files', {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
    return res.data
}

const verifyToken = async (token) => {
    try {
        const res = await axios.get('/verify_token_authenticity', {
            headers: {'Authorization': `bearer ${token}`}
        })
        return res        
    } catch (e) {
        return 'FAIL'
    }
}

const adminSaveFile = async ( filename, content, userId, token ) => {
    const res = await axios.put('/files/force_save', {
        'filename': filename,
        'textContent': content,
        'userId': userId
    }, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
    return res.data
}

const deleteFile = async ( fileId, token ) => {
    const res = await axios.delete('/files/delete', {
        data: {
            'fileId': fileId,
        },
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
    return res.data
}
export default {
    sendToCompile: sendToCompile,
    sendLogin: sendLogin,
    getUserFiles: getUserFiles,
    getAllUsers:  getAllUsers,
    uploadFile: uploadFile,
    deployToRobot: deployToRobot,
    changePassword: changePassword,
    getAllFiles: getAllFiles,
    getPassReq: getPassReq,
    togglePassReq: togglePassReq,
    verifyToken: verifyToken,
    saveNew: saveNew,
    hideFile: hideFile,
    saveExisting: saveExisting,
    adminSaveFile: adminSaveFile,
    deleteFile: deleteFile
}
