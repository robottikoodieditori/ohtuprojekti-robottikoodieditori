import { setResponseFromServer } from "../reducers/editorReducer"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

const Response = () => {
    const dispatch = useDispatch()
    const serverResponse = useSelector(state => state.editor.responseFromServer)
    const handleClick = () => {
        dispatch(setResponseFromServer(''))
    }

    if (serverResponse.length == 0) return (<div></div>)

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