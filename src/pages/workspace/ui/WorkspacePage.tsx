import styles from './WorkspacePage.module.scss';
import {WorkspaceBlock} from "./workspace-block";
import {Outlet} from "react-router-dom";


export const WorkspacePage = () => {
    return (
        <div className={styles.workspacePageWrapper}>
            <WorkspaceBlock />
            <Outlet />
        </div>
    )
};