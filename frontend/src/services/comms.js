import axios from "axios";

const sendToCompile = async (code) => {
    const res = await axios.post('/send/compiler', {'code': code})
    return res.data
}

const sendName = async (name) => {
    const res = await axios.post('/send/name', {'name': name})
    return res.data
}

export default {
    sendToCompile: sendToCompile,
    sendName: sendName
}