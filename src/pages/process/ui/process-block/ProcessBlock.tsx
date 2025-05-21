import css from './ProcessBlock.module.scss';
import {ProcessList} from "./process-list";
import {ProcessEditor} from "./process-editor";
import {useEffect, useState} from "react";
import {useProcess} from "../../../../entities/process/model/hooks/useProcess.ts";
import {processApi} from "../../../../entities/process/api/api.ts";


export const ProcessBlock = () => {
    const {
        processState,
        updateActiveProcess,
        updateProcesses,
        updateDescription,
        updateTitle
    } = useProcess()

    const {data} = processApi.useGetQuery();
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (data && !isDataLoaded) {
            updateProcesses(data.processes);
            setIsDataLoaded(true);
        }
    }, [data, isDataLoaded, updateProcesses]);

    console.log(processState.processes)
    const activeProcess = processState.processes.find(
        (p) => p.id === processState.activeProcess
    );

    return (
        <div className={css.processBlockWrapper}>
            {!activeProcess
                ?
                <ProcessList
                    processes={processState.processes}
                    updateProcesses={updateProcesses}
                    updateActiveProcess={updateActiveProcess}

                    isModalOpen={isModalOpen}
                    toggleModal={() => setIsModalOpen((prev) => !prev)}
                />
                :
                <ProcessEditor
                    // activeProcess={}
                    // steps={}
                    // updateTitle={}
                    // updateDescription={}
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