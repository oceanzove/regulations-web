import React from 'react';
import { Route, Routes } from 'react-router-dom';
import css from './Router.module.scss';
import {SignInPage} from "../../pages/sing-in";
import {RegulationPage} from "../../pages/regulation";

const Router = () => (
    <div className={css.router}>
        <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/regulation" element={<RegulationPage />} />
        </Routes>
    </div>
);
export default Router;