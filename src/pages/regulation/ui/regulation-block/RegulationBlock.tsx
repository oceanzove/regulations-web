import css from './RegulationBlock.module.scss';
import {RegulationList} from "./regulation-list";
import {useRegulation} from "../../../../entities/regulation/model/hooks/useRegulation.ts";
import {RegulationEditor} from "./regulation-editor";
import {useEffect, useState} from "react";
import {regulationApi} from "../../../../entities/regulation/api/api.ts";

export const RegulationBlock = () => {
    const {
        regulationState,
        updateRegulation,
        updateContent,
        updateTitle,
        updateActiveRegulation,
    } = useRegulation()

    const { data } = regulationApi.useGetQuery();
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        if (data && !isDataLoaded) {
            updateRegulation(data.regulations);
            setIsDataLoaded(true);
        }
    }, [data, isDataLoaded, updateRegulation]);

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
                    updateTitle={updateTitle}
                />
            ) : (
                <div className={css.placeholder}>
                    Выберите или создайте регламент для редактирования
                </div>
            )}
        </div>
    )
};