import styles from './WorkspaceBlock.module.scss';
import {useLocation, useNavigate} from "react-router-dom";

export const WorkspaceBlock = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className={styles.workspaceBlockWrapper}>
            <div className={styles.workspaceTitle}>
                Рабочее пространство
            </div>
            <div className={styles.workspacePanel}>
                <div className={`${styles.panel} ${location.pathname.startsWith('/process') ? styles.active : ''}`}
                     onClick={() => {
                         navigate('./process')
                     }}
                >
                    Мои процессы
                </div>
                <div className={`${styles.panel} ${location.pathname.startsWith('/regulation') ? styles.active : ''}`}
                     onClick={() => {
                         navigate('./regulation')
                     }}
                >
                    Мои регламенты
                </div>
                <div className={`${styles.panel} ${location.pathname.startsWith('/nothing') ? styles.active : ''}`}
                     onClick={() => {
                         navigate('./nothing')
                     }}
                >
                    ...
                </div>
            </div>
        </div>
    )
};