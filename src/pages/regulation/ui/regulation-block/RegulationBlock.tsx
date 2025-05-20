import css from './RegulationBlock.module.scss';
import {RegulationList} from "./regulation-list";
import {RegulationEditor} from "./regulation-editor";
import {useRegulation} from "../../../../entities/regulation/model/hooks/useRegulation.ts";
import {regulationApi} from "../../../../entities/regulation/api/api.ts";
import {useEffect, useMemo, useState} from "react";
import {IRegulation} from "../../../../entities/regulation/api/types.ts";

export const RegulationBlock = () => {

    const {
        regulationState,
        updateRegulation,
        updateContent,
        updateTitle,
        updateActiveRegulation,
    } = useRegulation()

    const {data} = regulationApi.useGetQuery();
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [activeRegulationId, setActiveRegulationId] = useState<string | null>(regulationState.activeRegulationId)


    useEffect(() => {
        if (data && !isDataLoaded) {
            updateRegulation(data.regulations);

            setIsDataLoaded(true);
        }
    }, [data, isDataLoaded, updateRegulation]);

    const activeRegulation = useMemo(() => {
        return regulationState.regulations.find((reg) => reg.id === activeRegulationId) || null;
    }, [regulationState.regulations, activeRegulationId]);

    const onSelectRegulation = (id: string | null) => {
        updateActiveRegulation(id);
        setActiveRegulationId(id);
    };

    return (
        <div className={css.regulationBlockWrapper}>
            {!activeRegulation
                ?
                <RegulationList
                    regulations={regulationState.regulations}
                    onSelectRegulation={(regulationId) => onSelectRegulation(regulationId)}
                />
                :
                <RegulationEditor
                    activeRegulation={activeRegulation}
                    onSelectRegulation={(regulationId) => onSelectRegulation(regulationId)}
                />
            }
        </div>
    )
};