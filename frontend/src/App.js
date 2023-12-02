import { useEffect, useState } from 'react';
import EditorView from "./components/editorview";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";  
import { LanguageProvider } from './contexts/languagecontext';
import LoginPopUp from "./components/loginPopUp";
import AdminView from "./components/adminView"; 
import './css/footer.css'
import { useDispatch, useSelector } from 'react-redux';
import { getPassRequired, verifyLogin } from './reducers/commsReducer';

function App() {
    const [isAdminViewOpen, setIsAdminViewOpen] = useState(false); // State to toggle admin view
    const dispatch = useDispatch()
    const token = useSelector(state => state.comms.userObject.token)
    document.title = 'Logomotion editor'; // Set the document title as received from origin/dev
    
    useEffect(() => {
        dispatch(getPassRequired())
        if (token !== '') {
            dispatch(verifyLogin(token))
        }
    }, [])

    const handleAdminViewClick = () => {
        setIsAdminViewOpen(!isAdminViewOpen)
    }

    return (
        <LanguageProvider>
            <div className="app">
                <div>
                    {!window.localStorage.getItem('username') && <LoginPopUp status={true} onClose={""}/> }
                </div>
                <div className="navbar">
                    <Navbar handleAdminViewClick={handleAdminViewClick}/>
                </div>
                {isAdminViewOpen ? (
                    <div className="admin-view" id="admin-view">
                        <AdminView />
                    </div>  
                ) : (
                    <div className="main-content">
                        <EditorView />
                        <Sidebar/>
                    </div>
                )}
            </div>
        </LanguageProvider>
    );
}

export default App;
