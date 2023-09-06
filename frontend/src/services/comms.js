import axios from "axios";

const data = () => {
    const data = axios.get("/data")
    return data
    }



export default {
    data: data
}