import React from 'react';
import Router from './app/router/Router';
import {useLocation} from "react-router-dom";
import {Navbar} from "./widgets/navbar/navbar.tsx";

const App = () => {
    const location = useLocation();

    const hiddenNavbarRoutes = ['/', '/registration'];

    const shouldHideNavbar = hiddenNavbarRoutes.includes(location.pathname);

    return (
        <>
            {!shouldHideNavbar && <Navbar />}
            <Router />
        </>
    );
};

export default App;