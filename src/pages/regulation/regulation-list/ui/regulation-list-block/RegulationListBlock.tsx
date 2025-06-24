import {useEffect, useState} from "react";
import styles from './RegulationListBlock.module.scss';
import {useRegulation} from "../../../../../entities/regulation/model/hooks/useRegulation.ts";
import {RegulationList} from "./regulation-list";
import {regulationApi} from "../../../../../entities/regulation/api/api.ts";
import {IRegulation} from "../../../../../entities/regulation/api/types.ts";

export const RegulationListBlock = () => {
    const {data: regulationData } = regulationApi.useGetQuery();

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={styles.regulationBlockWrapper}>
            <RegulationList
                regulations={regulationData?.regulations || []}

                isModalOpen={isModalOpen}
                toggleModal={() => setIsModalOpen((prev) => !prev)}
            />
        </div>
    )
};