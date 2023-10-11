import { setResponseFromServer } from "../reducers/editorReducer"
import { useDispatch } from "react-redux"

const Response = ({ serverResponse }) => {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(setResponseFromServer(''))
    }

    if (serverResponse.length == 0) return (<div></div>)

    return (
        <div id='sResponse' className="sResponse" onClick={handleClick}>
            Server responded with:
            {serverResponse.map(res => <p key={res.start}>
                line: {res.line}<br/>
                start: {res.start}<br/>
                end: {res.end}<br/>
                message: {res.message}</p> )}
        </div>
    )
}

export default Response