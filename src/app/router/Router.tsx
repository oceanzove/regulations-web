import React from 'react';
import { Route, Routes} from 'react-router-dom';
import css from './Router.module.scss';
import {SignInPage} from "../../pages/sing-in";
import {ProcessListPage} from "../../pages/process/process-list";
import {ProcessViewPage} from "../../pages/process/process-view";
import {RegulationListPage} from "../../pages/regulation/regulation-list";
import {RegulationViewPage} from "../../pages/regulation/regulation-view";

const Router = () => {
    const token = localStorage.getItem('access_token');


    return (
        <div className={css.router}>
            {token
                ?
                <Routes>
                    {/*<Route path="/" element={<RegulationPage />} />*/}
                    <Route path="/regulation" element={<RegulationListPage/>}/>
                    <Route path="/regulation/:id" element={<RegulationViewPage/>}/>
                    {/*<Route path="/regulation" element={<RegulationPage/>}/>*/}
                    <Route path="/process" element={<ProcessListPage/>}/>
                    <Route path="/process/:id" element={<ProcessViewPage />} />
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