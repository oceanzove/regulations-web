import styles from './ProccesListPage.module.scss';
import {ProcessListBlock} from "./process-list-block/ui";

export const ProcessListPage = () => {
    return (
        <div className={styles.wrapper}>
            <ProcessListBlock />
        </div>
    )
};