import styles from "./OrganizationBlock.module.scss";
import {Button} from "../../../../shared/ui/button";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

export const OrganizationBlock = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className={styles.organizationBlockWrapper}>
            <div className={styles.organizationControl}>
                <Button className={`${styles.organizationControlButton} ${location.pathname.startsWith('/organization/department') ? styles.active : ''}`}
                        onClick={() => {
                            navigate('./department')
                        }}
                >
                    Подразделения
                </Button>
                <Button className={`${styles.organizationControlButton} ${location.pathname.startsWith('/organization/position') ? styles.active : ''}`}
                        onClick={() => {
                            navigate('./position')
                        }}
                >
                    Должности
                </Button>
                <Button className={`${styles.organizationControlButton} ${location.pathname.startsWith('/organization/employee') ? styles.active : ''}`}
                        onClick={() => {
                            navigate('./employee')
                        }}
                >
                    Сотрудники
                </Button>
                <Button className={styles.organizationControlButton}
                        disabled={true}
                >
                    Схема
                </Button>
            </div>
            <Outlet />
        </div>
    )
};