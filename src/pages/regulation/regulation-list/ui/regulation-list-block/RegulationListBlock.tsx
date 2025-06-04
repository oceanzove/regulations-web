import {useEffect, useState} from "react";
import styles from './RegulationListBlock.module.scss';
import {useRegulation} from "../../../../../entities/regulation/model/hooks/useRegulation.ts";
import {RegulationList} from "./regulation-list";
import {regulationApi} from "../../../../../entities/regulation/api/api.ts";

export const RegulationListBlock = () => {
    const {
        regulationState,
        updateRegulations,
    } = useRegulation()

    const {data: regulationData } = regulationApi.useGetQuery();
    const [isDataRegulationLoaded, setIsDataRegulationLoaded] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (regulationData && !isDataRegulationLoaded) {
            if (regulationData.regulations !== null) {
                updateRegulations(regulationData.regulations)
            }
            setIsDataRegulationLoaded(true);
        }
    }, [regulationData, isDataRegulationLoaded, updateRegulations]);

    return (
        <div className={styles.regulationBlockWrapper}>
            <RegulationList
                regulations={regulationState.regulations}
                updateRegulations={updateRegulations}

                isModalOpen={isModalOpen}
                toggleModal={() => setIsModalOpen((prev) => !prev)}
            />
        </div>
    )
};