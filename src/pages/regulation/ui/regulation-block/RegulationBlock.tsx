import css from './RegulationBlock.module.scss';
import {RegulationList} from "./regulation-list";
import {RegulationEditor} from "./regulation-editor";
import {useRegulation} from "../../../../entities/regulation/model/hooks/useRegulation.ts";
import {regulationApi} from "../../../../entities/regulation/api/api.ts";
import {useEffect, useMemo, useState} from "react";

export const RegulationBlock = () => {
    const {
        regulationState,
        updateRegulation,
        updateActiveRegulation,
    } = useRegulation()

    const {data} = regulationApi.useGetQuery();
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [activeRegulationId, setActiveRegulationId] = useState<string | null>(regulationState.activeRegulationId)

    const [isModalOpen, setIsModalOpen] = useState(false);

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
                    updateRegulation={updateRegulation}

                    onSelectRegulation={(regulationId) => onSelectRegulation(regulationId)}

                    isModalOpen={isModalOpen}
                    toggleModal={() => setIsModalOpen((prev) => !prev)}
                />
                :
                <RegulationEditor
                    activeRegulation={activeRegulation}
                    onSelectRegulation={onSelectRegulation}
                />
            }
        </div>
    )
};