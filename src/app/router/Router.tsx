import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import css from './Router.module.scss';
import {SignInPage} from "../../pages/sing-in";
import {RegulationPage} from "../../pages/regulation";
import {ProcessPage} from "../../pages/process";

const Router = () => {
    const token = localStorage.getItem('access_token');


    return (
        <div className={css.router}>
            {token
                ?
                <Routes>
                    {/*<Route path="/" element={<RegulationPage />} />*/}
                    <Route path="/" element={<RegulationPage/>}/>
                    {/*<Route path="/regulation" element={<RegulationPage/>}/>*/}
                    <Route path="/process" element={<ProcessPage/>}/>
                </Routes>
                :
                <Routes>
                    {/*<Route path="/" element={<RegulationPage />} />*/}
                    <Route path="/" element={<SignInPage/>}/>
                    {/*<Route path="/regulation" element={<RegulationPage/>}/>*/}
                    {/*<Route path="/process" element={<ProcessPage/>}/>*/}
                </Routes>
            }
        </div>
    )
};
export default Router;