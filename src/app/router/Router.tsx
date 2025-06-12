import React, {useEffect, useState} from 'react';
import {Outlet, Route, Routes, useNavigate} from 'react-router-dom';
import css from './Router.module.scss';
import {SignInPage} from "../../pages/sing-in";
import {ProcessListPage} from "../../pages/process/process-list";
import {ProcessViewPage} from "../../pages/process/process-view";
import {RegulationListPage} from "../../pages/regulation/regulation-list";
import {RegulationViewPage} from "../../pages/regulation/regulation-view";
import {WorkspacePage} from "../../pages/workspace";
import {OrganizationPage} from "../../pages/organization";
import {AccountRoleEnum, IAccount} from "../../entities/employee/api/types.ts";
import {organizationApi} from "../../entities/employee/api/api.ts";
import {DepartmentBlock} from "../../pages/organization/ui/organization-block/department-block";
import {PositionBlock} from "../../pages/organization/ui/organization-block/position-block";
import {EmployeeBlock} from "../../pages/organization/ui/organization-block/employee-block";

const Router = () => {
    const token = localStorage.getItem('access_token');

    const navigate = useNavigate();
    useEffect(() => {
        if (token === null) {
            navigate('./');
        }
    }, [navigate, token]);

    const [account, setAccount] = useState<IAccount>();
    const {data: accountData} = organizationApi.useGetAccountQuery();

    useEffect(() => {
        if (accountData) {
            setAccount(accountData as IAccount);
        }
    }, [accountData, setAccount]);

    return (
        <div className={css.router}>
            {token
                ?
                <>
                    <Routes>
                        <Route path="/" element={<WorkspacePage/>}>
                            <Route path="regulation" element={<RegulationListPage/>}/>
                            <Route path="regulation/:id" element={<RegulationViewPage/>}/>

                            <Route path="process" element={<ProcessListPage/>}/>
                            <Route path="process/:id" element={<ProcessViewPage/>}/>

                            <Route path="nothing" element={<div></div>}/>

                            {
                                account?.role === AccountRoleEnum.ADMIN ?
                                    <Route path="organization" element={<OrganizationPage/>}>
                                        <Route path="department" element={<DepartmentBlock/>}/>
                                        <Route path="position" element={<PositionBlock/>}/>
                                        <Route path="employee" element={<EmployeeBlock/>}/>
                                    </Route>
                                    :
                                    ''
                            }
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