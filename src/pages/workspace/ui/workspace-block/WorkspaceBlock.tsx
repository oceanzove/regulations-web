import styles from './WorkspaceBlock.module.scss';
import {useLocation, useNavigate} from "react-router-dom";
import {organizationApi} from "../../../../entities/employee/api/api.ts";
import {useEffect, useState} from "react";
import {AccountRoleEnum, IAccount} from "../../../../entities/employee/api/types.ts";
import {Button} from "../../../../shared/ui/button";
import {notificationSuccess} from "../../../../widgets/notifications/callNotification.tsx";

export const WorkspaceBlock = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [ account, setAccount ] = useState<IAccount>();

    const {data: accountData} = organizationApi.useGetAccountQuery();

    useEffect(() => {
        if (accountData) {
            setAccount(accountData as IAccount);
        }
    }, [accountData, setAccount]);


    const handleLogout = async () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/')

        notificationSuccess('Вы вышли из аккаунта');
    };

    return (
        <div className={styles.workspaceBlockWrapper}>
            <div className={styles.nav}>
                <div>
                    {/*Регламенты*/}
                </div>
                <Button className={styles.exitButton}
                        onClick={handleLogout}
                >
                    Выход
                </Button>
            </div>
            <div className={styles.block}>
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
                    <div
                        className={`${styles.panel} ${location.pathname.startsWith('/regulation') ? styles.active : ''}`}
                        onClick={() => {
                            navigate('./regulation')
                        }}
                    >
                        Мои регламенты
                    </div>
                    {account?.role === AccountRoleEnum.ADMIN ?
                        <div
                            className={`${styles.panel} ${location.pathname.startsWith('/organization') ? styles.active : ''}`}
                            onClick={() => {
                                navigate('./organization')
                            }}
                        >
                            Орг. структура
                        </div>
                        :
                        ''
                    }
                    <div className={`${styles.panel} ${location.pathname.startsWith('/nothing') ? styles.active : ''}`}
                         onClick={() => {
                             navigate('./nothing')
                         }}
                    >
                        ...
                    </div>
                </div>
            </div>
        </div>
    )
};