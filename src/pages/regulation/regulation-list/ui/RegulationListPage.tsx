import styles from './RegulationListPage.module.scss';
import {RegulationListBlock} from "./regulation-list-block";

export const RegulationListPage = () => {
    return (
        <div className={styles.wrapper}>
            <RegulationListBlock />
        </div>
    )
};