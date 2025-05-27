import styles from './ProcessViewPage.module.scss';
import {ProcessViewBlock} from "./ui";

export const ProcessViewPage = () => {
    return (
        <div className={styles.wrapper}>
            <ProcessViewBlock />
        </div>
    )
};