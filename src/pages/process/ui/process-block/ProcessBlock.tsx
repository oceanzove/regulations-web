import css from './ProcessBlock.module.scss';
import {ProcessList} from "./process-list";
import {ProcessEditor} from "./process-editor";
import {useEffect, useMemo, useState} from "react";
import {useProcess} from "../../../../entities/process/model/hooks/useProcess.ts";
import {processApi} from "../../../../entities/process/api/api.ts";


export const ProcessBlock = () => {
    const {
        processState,
        updateActiveProcess,
        updateProcesses,
    } = useProcess()

    const {data} = processApi.useGetQuery();
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [activeProcessId, setActiveProcessId] = useState<string | null>(processState.activeProcess)

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (data && !isDataLoaded) {
            if (data.processes !== null) {
                updateProcesses(data.processes);
            }
            setIsDataLoaded(true);
        }
    }, [data, isDataLoaded, updateProcesses]);

    const activeProcess = useMemo(() => {
        return processState.processes.find((process) => process.id === activeProcessId) || null;
    }, [processState.processes, activeProcessId])

    const onSelectProcess = (id: string | null) => {
        updateActiveProcess(id);
        setActiveProcessId(id);
    };

    return (
        <div className={css.processBlockWrapper}>
            {!activeProcess
                ?
                <ProcessList
                    processes={processState.processes}
                    updateProcesses={updateProcesses}

                    onSelectProcess={(processId) => onSelectProcess(processId)}

                    isModalOpen={isModalOpen}
                    toggleModal={() => setIsModalOpen((prev) => !prev)}
                />
                :
                <ProcessEditor
                    activeProcess={activeProcess}
                />

            }
            {/*{activeProcess ? (*/}
            {/*    <ProcessEditor*/}
            {/*        activeProcess={activeProcess}*/}
            {/*        updateTitle={updateTitle}*/}
            {/*        updateDescription={updateDescription}*/}
            {/*        steps={processState.processSteps}*/}
            {/*    />*/}
            {/*) : (*/}
            {/*    <div className={css.placeholder}>*/}
            {/*        Выберите или создайте процесс для редактирования*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    )
};