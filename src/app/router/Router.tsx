import React from 'react';
import { Route, Routes } from 'react-router-dom';
import css from './Router.module.scss';

const Router = () => (
    <div className={css.router}>
        <Routes>
            <Route path="/" element={<div> Hello </div>} />
        </Routes>
    </div>
);
export default Router;