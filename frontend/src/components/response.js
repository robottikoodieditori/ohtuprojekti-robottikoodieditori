import { setResponseFromServer } from "../reducers/commsReducer"
import { useDispatch, useSelector } from "react-redux"

const Response = () => {
    const dispatch = useDispatch()
    const serverResponse = useSelector(state => state.comms.responseFromServer)

    const handleClick = () => {
        dispatch(setResponseFromServer(''))
    }

    if (!serverResponse || serverResponse.length == 0) return (<div onClick={handleClick}></div>)

    return (
        <div id='sResponse' className="sResponse" onClick={handleClick}>
            Server responded:
            {serverResponse.map(res => <p key={res.start}>
                line: {res.line}<br/>
                start: {res.start}<br/>
                end: {res.end}<br/>
                message: {res.message}</p> )}
        </div>
    )
}

export default Response