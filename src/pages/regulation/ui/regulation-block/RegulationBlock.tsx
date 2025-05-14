import css from './RegulationBlock.module.scss';
import {RegulationList} from "./regulation-list";
import {RegulationEditor} from "./regulation-editor";

export const RegulationBlock = () => {

    const list = true;
    return (
        <div className={css.regulationBlockWrapper}>
            {   list
                ?
                <RegulationList/>
                :
                <RegulationEditor/>
            }
        </div>
    )
};