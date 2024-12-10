import React from 'react';
import { Route, Routes } from 'react-router-dom';
import css from './Router.module.scss';
import {SignInPage} from "../../pages/sing-in";

const Router = () => (
    <div className={css.router}>
        <Routes>
            <Route path="/" element={<SignInPage />} />
        </Routes>
    </div>
);
export default Router;