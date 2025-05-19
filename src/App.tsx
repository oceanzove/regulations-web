import React from 'react';
import Router from './app/router/Router';
import {useLocation} from "react-router-dom";
import {Navbar} from "./widgets/navbar/navbar.tsx";
import {ToastContainer} from "react-toastify";

const App = () => {
    const location = useLocation();

    const hiddenNavbarRoutes = ['/', '/registration'];

    const shouldHideNavbar = hiddenNavbarRoutes.includes(location.pathname);

    return (
        <>
            {/*{!shouldHideNavbar && <Navbar />}*/}
            <Router />
            <ToastContainer />
        </>
    );
};

export default App;
