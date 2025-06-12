import styles from './OrganizationPage.module.scss';
import {OrganizationBlock} from "./organization-block";

export const OrganizationPage = () => {
    return (
        <div className={styles.organizationPageWrapper}>
            <OrganizationBlock />
        </div>
    )
};