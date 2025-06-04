import {useParams} from "react-router-dom";
import styles from './ProcessViewBlock.module.scss';
import {processApi} from "../../../../../../entities/process/api/api.ts";
import {useEffect, useState} from "react";
import {IProcess} from "../../../../../../entities/process/api/types.ts";
import {ProcessView} from "./ProcessView";
import {IStep} from "../../../../../../entities/step/api/types.ts";
import {IRegulation} from "../../../../../../entities/regulation/api/types.ts";

export const ProcessViewBlock = () => {
    // const {
    //     processState,
    //     updateProcesses,
    // } = useProcess()
    //
    const [ process, setProcess ] = useState<IProcess>({ id: '', title: '', description: '', responsible: '' })
    const [ steps, setSteps ] = useState<IStep[]>([])
    const [ regulations, setRegulations ] = useState<IRegulation[]>([])
    // const {data} = processApi.useGetQuery();
    // const [isDataLoaded, setIsDataLoaded] = useState(false);
    //
    // const [isModalOpen, setIsModalOpen] = useState(false);
    //
    // useEffect(() => {
    //     if (data && !isDataLoaded) {
    //         if (data.processes !== null) {
    //             updateProcesses(data.processes);
    //         }
    //         setIsDataLoaded(true);
    //     }
    // }, [data, isDataLoaded, updateProcesses]);

    const { id } = useParams<{ id: string }>();

    const { data: processData } = processApi.useGetByIdQuery(id as string);
    const { data: stepsData } = processApi.useGetStepsQuery(id as string);
    const { data: regulationsData } = processApi.useGetRegulationsQuery(id as string);

    useEffect(() => {
        if (processData) {
            setProcess(processData as IProcess);
        }
    }, [processData, setProcess]);

    useEffect(() => {
        if (stepsData) {
            setSteps(stepsData as IStep[]);
        }
    }, [stepsData, setSteps]);

    useEffect(() => {
        if (regulationsData) {
            setRegulations(regulationsData as IRegulation[]);
        }
    }, [regulationsData, setRegulations]);

    console.log(processData)
    console.log(stepsData)
    return (
        <div className={styles.processBlockWrapper}>
            <ProcessView
                process={process}
                steps={steps}
                regulations={regulations}
            />
        </div>
    )
};