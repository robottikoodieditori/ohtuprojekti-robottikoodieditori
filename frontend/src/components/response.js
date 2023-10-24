import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setResponseFromServer } from '../reducers/commsReducer';
import { LanguageContext } from '../contexts/languagecontext';

const Response = () => {
    const dispatch = useDispatch();
    const { translations } = useContext(LanguageContext);
    const serverResponse = useSelector((state) => state.comms.responseFromServer);

    const handleClick = () => {
        dispatch(setResponseFromServer(''));
    }

    if (!serverResponse || serverResponse.length === 0) {
        return <div onClick={handleClick}></div>;
    }

    return (
        <div id='sResponse' className='sResponse' onClick={handleClick}>
            {translations.response.serverResponded}
            {serverResponse.errors.map((res) => (
                <p key={res.start}>
                    {`${translations.response.line} ${res.line}`}<br/>
                    {`${translations.response.start} ${res.start}`}<br/>
                    {`${translations.response.end} ${res.end}`}<br/>
                    {`${translations.response.message} ${res.message}`}<br/>
                </p>
            ))}
        </div>
    );
}

export default Response;
