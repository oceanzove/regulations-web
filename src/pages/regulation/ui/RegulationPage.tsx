import styles from './RegulationPage.module.scss';
import {RegulationBlock} from "./regulation-block";

export const RegulationPage = () => {
    return (
        <div className={styles.regulationPageWrapper}>
            <RegulationBlock />
        </div>
    )
};