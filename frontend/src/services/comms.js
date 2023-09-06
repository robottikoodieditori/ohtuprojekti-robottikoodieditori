import axios from "axios";

const getData = () => {
    const data = axios.get("/data")
    return data
}

export default {
    getData: getData
}