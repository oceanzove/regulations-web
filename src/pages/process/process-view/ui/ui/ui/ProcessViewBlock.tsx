import {useNavigate, useParams} from "react-router-dom";
import styles from './ProcessViewBlock.module.scss';
import {processApi} from "../../../../../../entities/process/api/api.ts";
import React, {useEffect, useState} from "react";
import {IProcess} from "../../../../../../entities/process/api/types.ts";
import {ProcessView} from "./ProcessView";
import {IStep} from "../../../../../../entities/step/api/types.ts";
import {IRegulation} from "../../../../../../entities/regulation/api/types.ts";
import {IconButton} from "../../../../../../shared/ui/icon-button/icon-button.tsx";
import {IconEnum} from "../../../../../../shared/ui/icon/IconType.tsx";

export const ProcessViewBlock = () => {
    // const {
    //     processState,
    //     updateProcesses,
    // } = useProcess()
    //
    const navigate = useNavigate();

    const [ process, setProcess ] = useState<IProcess>({ id: '', title: '', description: '', responsible: '' })
    const [ steps, setSteps ] = useState<IStep[]>([])
    const [ regulations, setRegulations ] = useState<IRegulation[]>([])

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

    return (
        <div className={styles.processBlockWrapper}>
            <div className={styles.controls}>
                <IconButton typeIcon={IconEnum.ARROW_LEFT}
                            className={styles.button}
                            onClick={() => navigate(-1)}
                />
                <IconButton typeIcon={IconEnum.EXPORT_PDF}
                            className={styles.button}
                            disabled={true}
                            onClick={() => {}}
                />
            </div>
            <ProcessView
                process={process}
                steps={steps}
                regulations={regulations}
            />
        </div>
    )
};