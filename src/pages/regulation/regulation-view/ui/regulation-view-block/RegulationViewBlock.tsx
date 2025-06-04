import {useParams} from "react-router-dom";
import styles from './RegulationViewBlock.module.scss';
import {useEffect, useState} from "react";
import {IRegulation} from "../../../../../entities/regulation/api/types.ts";
import {regulationApi} from "../../../../../entities/regulation/api/api.ts";
import {RegulationEditor} from "./editor";
import {Sections} from "./section";
import {Section} from "./section/Sections.tsx";

export const RegulationViewBlock = () => {
    // const {
    //     processState,
    //     updateProcesses,
    // } = useProcess()
    //
    const [regulation, setRegulation] = useState<IRegulation>({id: '', title: '', content: ''})
    // const [ steps, setSteps ] = useState<IStep[]>([])
    // const [ regulations, setRegulations ] = useState<IRegulation[]>([])
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

    const {id} = useParams<{ id: string }>();

    const {data: regulationData} = regulationApi.useGetByIdQuery(id as string);
    // const { data: stepsData } = processApi.useGetStepsQuery(id as string);
    // const { data: regulationsData } = processApi.useGetRegulationsQuery(id as string);

    useEffect(() => {
        if (regulationData) {
            setRegulation(regulationData as IRegulation);
        }
    }, [regulationData, setRegulation]);

    return (
        <div className={styles.regulationViewBlockWrapper}>
            <RegulationEditor
                regulation={regulation}
                selectedSections={[]}
                onEditorChange={() => {}}
            />
            {/*<ProcessView*/}
            {/*    process={process}*/}
            {/*    steps={steps}*/}
            {/*    regulations={regulations}*/}
            {/*/>*/}
        </div>
    )
};