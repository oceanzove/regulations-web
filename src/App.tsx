import React from 'react';
import Router from './app/router/Router';
import {ToastContainer} from "react-toastify";
import {SessionGuard} from "./widgets/session-guard";
import 'react-datepicker/dist/react-datepicker.css';

const App = () => {

    return (
        <>
            <SessionGuard>
                <Router
                />
            </SessionGuard>
            {/*{!shouldHideNavbar && <Navbar />}*/}
            <ToastContainer />
        </>
    );
};

export default App;
