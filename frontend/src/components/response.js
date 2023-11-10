import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setResponseFromServer } from '../reducers/commsReducer';
import { LanguageContext } from '../contexts/languagecontext';
import '../css/error.css'

const Response = () => {
    const dispatch = useDispatch();
    const { language, translations } = useContext(LanguageContext);
    const serverResponse = useSelector((state) => state.comms.responseFromServer);

    const handleClose = () => {
        dispatch(setResponseFromServer(''));
    }

    if (!serverResponse || serverResponse.length === 0) {
        return null;
    }

    return (
        <div id='sResponse' className='sResponse'>
            <div className="errorHeader">
                <h4>{translations.response.serverResponded}</h4>
                <button className="closeButton" onClick={handleClose}>X</button>
            </div>
            {serverResponse.errors.map((res) => (
                <div key={res.start} className="errorCard">
                    <h5>{`${translations.response.message} ${language === 'en' ? res.eng : res.fin}`}</h5>
                    <p>{`${translations.response.line} ${res.line}`}</p>
                    <p>{`${translations.response.start} ${res.start} - ${translations.response.end} ${res.end-1}`}</p>
                </div>

            ))}
        </div>
    );
}

export default Response;
