import css from './RegulationBlock.module.scss';
import {RegulationList} from "./regulation-list";
import {useRegulation} from "../../../../entities/regulation/model/hooks/useRegulation.ts";
import {RegulationEditor} from "./regulation-editor";

export const RegulationBlock = () => {
    const {
        regulationState,
        updateRegulation,
        updateContent,
        updateActiveRegulation,
    } = useRegulation()

    const activeRegulation = regulationState.regulations.find(
        (reg) => reg.id === regulationState.activeRegulation
    );

    return (
        <div className={css.wrapper}>
            <RegulationList
                regulations={regulationState.regulations}
                updateRegulations={updateRegulation}
                updateActiveRegulation={updateActiveRegulation}
            />
            {activeRegulation ? (
                <RegulationEditor
                    activeRegulation={activeRegulation}
                    updateContent={updateContent}
                />
            ) : (
                <div className={css.placeholder}>
                    Выберите или создайте правило для редактирования
                </div>
            )}
        </div>
    )
};