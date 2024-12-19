import React from 'react';
import css from './navbar.module.scss';
import {NavLink, useLocation} from "react-router-dom";

interface INavbarProps {
    a?: string;
}

export const Navbar = (props: INavbarProps) => {
    const location = useLocation();

    const { a } = props;
    return (
        <div className={css.navbar}>
            { a }
            <NavLink
                to="/processes"
                className={`${css.navbar_link} ${location.pathname === '/processes' ? css.active : ''}`}
            >
                Процессы
            </NavLink>
            <NavLink
                to={'/regulation'}
                className={`${css.navbar_link} ${location.pathname === '/regulation' ? css.active : ''}`}
            >
                Регламенты
            </NavLink>
            <NavLink
                to={'/profile'}
                className={`${css.navbar_link} ${location.pathname === '/profile' ? css.active : ''}`}
            >
                Профиль
            </NavLink>
        </div>
    );
};