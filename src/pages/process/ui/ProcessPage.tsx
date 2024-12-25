import css from './ProccesPage.module.scss';
import {ProcessBlock} from "./process-block";

export const ProcessPage = () => {
    return (
        <div className={css.wrapper}>
            <ProcessBlock />
        </div>
    )
};