import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setResponseFromServer } from '../reducers/commsReducer';
import { LanguageContext } from '../contexts/languagecontext';
import '../css/response.css'

/**
 * Response component handles displaying server responses and notifications.
 * @component
 */

const Response = () => {
    const dispatch = useDispatch();
    const { language, translations } = useContext(LanguageContext);
    const serverResponse = useSelector((state) => state.comms.responseFromServer);

    const handleClose = () => {
        dispatch(setResponseFromServer(''));
    }

    //Render the error messages if there are any errors in the server response.
    if (serverResponse && serverResponse.errors && serverResponse.errors.length > 0) {
        return (
            <div id='error' className='error' role="dialog" aria-label="error message">
                <div className="errorHeader">
                    <h4 tabIndex="0">{translations.response.serverResponded}</h4>
                    <button className="closeButton" onClick={handleClose}>X</button>
                </div>
                {serverResponse.errors.map((res) => (
                    <div key={res.start} className="errorCard">
                        <h5 tabIndex="0">{`${translations.response.message} ${language === 'en' ? res.eng : res.fin}`}</h5>
                        <p tabIndex="0">{`${translations.response.line} ${res.line}`}</p>
                        <p>{`${translations.response.start} ${res.start} - ${translations.response.end} ${res.end-1}`}</p>
                    </div>
                ))}
            </div>
        );
    }

    // Render a confirmation message if there are no errors in the server response.}
    if (serverResponse.errors && serverResponse.errors.length < 1) {
        return (
            <div id='confirmation' className='confirmation' role = "dialog" aria-label="confirmation message">
                <div className="confirmationHeader">
                    <h4 tabIndex="0">{translations?.response.serverResponded}</h4>
                    <button className="closeButton" onClick={handleClose}>X</button>
                </div>
                <div className="confirmationCard">
                    <h5 tabIndex="0">{translations?.response.confirmation}</h5>
                </div>
            </div>
        );
    }
}

export default Response;
