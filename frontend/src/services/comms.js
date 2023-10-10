import axios from "axios";

const getData = () => {
    const req = axios.get("/data")
    return req.then(res => res.data)
}

const sendToCompile = async (code) => {
    const res = await axios.post('/send/compiler', {'data': code})
    console.log(res)
    return res.data
}

const sendName = async (name) => {
    const res = await axios.post('/send/name', {'name': name})
    return res.data
}

export default {
    getData: getData,
    sendToCompile: sendToCompile,
    sendName: sendName
}