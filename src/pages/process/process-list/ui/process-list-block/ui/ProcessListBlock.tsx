import css from './ProcessListBlock.module.scss';
import {ProcessList} from "./process-list";
import {useEffect, useState} from "react";
import {useProcess} from "../../../../../../entities/process/model/hooks/useProcess.ts";
import {processApi} from "../../../../../../entities/process/api/api.ts";
import {regulationApi} from "../../../../../../entities/regulation/api/api.ts";
import {IRegulation} from "../../../../../../entities/regulation/api/types.ts";


export const ProcessListBlock = () => {
    const {
        processState,
        updateProcesses,
    } = useProcess()

    const {data: processData} = processApi.useGetQuery();
    const {data: regulationData } = regulationApi.useGetQuery();

    const [isDataProcessLoaded, setIsDataProcessLoaded] = useState(false);
    const [isDataRegulationLoaded, setIsDataRegulationLoaded] = useState(false);

    const [ regulations, setRegulations ] = useState<IRegulation[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (processData && !isDataProcessLoaded) {
            if (processData.processes !== null) {
                updateProcesses(processData.processes);
            }
            setIsDataProcessLoaded(true);
        }
    }, [processData, isDataProcessLoaded, updateProcesses]);


    useEffect(() => {
        if (regulationData && !isDataRegulationLoaded) {
            if (regulationData.regulations !== null) {
                setRegulations(regulationData.regulations)
            }
            setIsDataRegulationLoaded(true);
        }
    }, [regulationData, isDataRegulationLoaded, setRegulations]);

    return (
        <div className={css.processBlockWrapper}>
            <ProcessList
                processes={processState.processes}
                regulations={regulations}
                updateProcesses={updateProcesses}

                isModalOpen={isModalOpen}
                toggleModal={() => setIsModalOpen((prev) => !prev)}
            />
        </div>
    )
};