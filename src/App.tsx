import React from 'react';
import Router from './app/router/Router';
import {useLocation} from "react-router-dom";
import {Navbar} from "./widgets/navbar/navbar.tsx";
import {ToastContainer} from "react-toastify";
import {SessionGuard} from "./widgets/session-guard/ui/session-guard.tsx";

const App = () => {
    // const location = useLocation();

    // const hiddenNavbarRoutes = ['/', '/registration'];

    // const shouldHideNavbar = hiddenNavbarRoutes.includes(location.pathname);

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
