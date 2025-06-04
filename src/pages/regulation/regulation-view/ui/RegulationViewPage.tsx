import styles from './RegulationViewPage.module.scss';
import {RegulationViewBlock} from "./regulation-view-block";

export const RegulationViewPage = () => {
    return (
        <div className={styles.wrapper}>
            <RegulationViewBlock />
        </div>
    )
};