import css from './RegulationPage.module.scss';
import {RegulationBlock} from "./regulation-block";

export const RegulationPage = () => {
    return (
        <div className={css.wrapper}>
            <RegulationBlock />
        </div>
    )
};