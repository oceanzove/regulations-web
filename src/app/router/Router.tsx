import React, {useEffect} from 'react';
import {Outlet, Route, Routes, useNavigate} from 'react-router-dom';
import css from './Router.module.scss';
import {SignInPage} from "../../pages/sing-in";
import {ProcessListPage} from "../../pages/process/process-list";
import {ProcessViewPage} from "../../pages/process/process-view";
import {RegulationListPage} from "../../pages/regulation/regulation-list";
import {RegulationViewPage} from "../../pages/regulation/regulation-view";
import {WorkspacePage} from "../../pages/workspace";

const Router = () => {
    const token = localStorage.getItem('access_token');

    const navigate = useNavigate();
    useEffect(() => {
        if (token === null) {
            navigate('./');
        }
    }, [navigate, token]);

    return (
        <div className={css.router}>
            {token
                ?
                <>
                    <Routes>
                        <Route path="/" element={<WorkspacePage />}>
                            <Route path="regulation" element={<RegulationListPage />} />
                            <Route path="regulation/:id" element={<RegulationViewPage />} />

                            <Route path="process" element={<ProcessListPage />} />
                            <Route path="process/:id" element={<ProcessViewPage />} />

                            <Route path="nothing" element={<div></div>} />
                        </Route>
                    </Routes>
                </>

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