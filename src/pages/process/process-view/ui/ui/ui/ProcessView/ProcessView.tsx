import styles from './ProcessView.module.scss';
import React, {useEffect, useMemo, useState} from "react";
import {Label} from "../../../../../../../shared/ui/label/label.tsx";
import {Input} from "../../../../../../../shared/ui/input/input.tsx";
import {IProcess} from "../../../../../../../entities/process/api/types.ts";
import {processApi} from "../../../../../../../entities/process/api/api.ts";
import {notificationError, notificationSuccess} from "../../../../../../../widgets/notifications/callNotification.tsx";
import {IRegulation} from "../../../../../../../entities/regulation/api/types.ts";
import {IStep} from "../../../../../../../entities/step/api/types.ts";
import {Button} from "../../../../../../../shared/ui/button";
import {IconEnum} from "../../../../../../../shared/ui/icon/IconType.tsx";
import {useNavigate} from "react-router-dom";
import {organizationApi} from "../../../../../../../entities/employee/api/api.ts";
import {RegulationViewModal} from "../../../../../../../widgets/modal/regulation/view";

interface IProcessEditorProps {
    steps: IStep[],
    process: IProcess,
    regulations: IRegulation[],
    // updateTitle: (id: string, title: string) => void,
    // updateDescription: (id: string , description: string) => void,
}

export const ProcessView = (props: IProcessEditorProps) => {
    const {steps, process, regulations} = props;

    const navigate = useNavigate();

    const [localTitle, setLocalTitle] = useState(process.title);
    const [localDescription, setLocalDescription] = useState(process.description);
    const [localResponsible, setLocalResponsible] = useState('');

    const [selectedRegulation, setSelectedRegulation] = useState<IRegulation | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    }

    const isChanged = localTitle !== process.title || localDescription !== process.description;

    const {data: positionsData} = organizationApi.useGetPositionsQuery();
    const {data: departmentData} = organizationApi.useGetDepartmentByIdQuery(process.responsible!, {
        skip: !process.responsible,
    });

    useEffect(() => {
        setLocalTitle(process.title);
        setLocalDescription(process.description);
        if (departmentData) {
            console.log(departmentData.name);
            setLocalResponsible(departmentData.name);
        }
    }, [departmentData, process]);

    const [update, {isLoading}] = processApi.useUpdateMutation();

    const onSaveClick = () => {
        if (!isChanged) return;

        // if (localTitle !== activeProcess.title) {
        //     updateTitle(activeProcess.id, localTitle);
        // }
        // if (localDescription !== activeProcess.description) {
        //     updateDescription(activeProcess.id, localDescription);
        // }
        if (localTitle !== process.title || localDescription !== process.description) {
            try {
                update({process: process.id, title: localTitle, description: localDescription})
                notificationSuccess('Сохранение', 'Процесс успешно сохранен');
            } catch {
                notificationError('Сохранение', 'Не удалось сохранить процесс');
            }
        }
    };
    // const activeProcess = useMemo(() => {
    //     return processState.processes.find((process) => process.id === activeProcessId) || null;
    // }, [processState.processes, activeProcessId])

    const positionMap = useMemo(() => {
        if (!positionsData?.positions) return {};
        return Object.fromEntries(
            positionsData.positions.map(p => [p.id, p.name])
        );
    }, [positionsData]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.aboutBlock}>
                    <div className={styles.meta}>
                        <Label label={'Название'} className={styles.label}>
                            <Input
                                value={localTitle}
                                onChange={(e) => setLocalTitle(e.target.value || '')}
                            />
                        </Label>
                        <Label label={'Описание'}>
                            <Input
                                value={localDescription}
                                onChange={(e) => setLocalDescription(e.target.value || '')}
                            />
                        </Label>
                    </div>
                    <Label label={'Ответственный'}>
                        <Input
                            value={localResponsible}
                            onChange={(e) => setLocalResponsible(e.target.value || '')}
                        />
                    </Label>
                </div>
                <div className={styles.regulationsBlock}>
                    <Label label={'Регламенты'}>
                        {regulations.length > 0
                            ?
                            <div className={styles.regulationContainer}>
                                {regulations
                                    .map(regulation => (
                                        <div key={regulation?.id} className={styles.regulationTag}
                                             onClick={() => {
                                                 setSelectedRegulation(regulation);
                                                 setIsModalOpen(true);
                                             }}
                                        >
                                            {regulation?.title}
                                        </div>
                                    ))
                                }
                            </div>
                            :
                            <div className={styles.noRegulation}>
                                Пока нет прикрепленных регламентов
                            </div>
                        }
                    </Label>
                </div>
                <div className={styles.instructionBlock}>
                    <Label label={'Инструкция'} childClassName={styles.instructionContainer}>
                        <div className={styles.filter}>
                            <Button
                                className={styles.filterButton}
                            > № </Button>
                            <Button
                                typeIcon={IconEnum.FILTER}
                                className={styles.filterButton}
                            > Название </Button>
                            <Button
                                typeIcon={IconEnum.FILTER}
                                className={styles.filterButton}
                            > Описание </Button>
                            <Button
                                typeIcon={IconEnum.FILTER}
                                className={styles.filterButton}
                            > Ответственный </Button>
                        </div>
                        <div className={styles.stepsContainer}>
                            {steps.map(step => (
                                <div key={step.id} className={styles.stepBlock}>
                                    <div className={styles.step}>
                                        {step.order + 1}
                                    </div>
                                    <div className={styles.step}>
                                        {step.name}
                                    </div>
                                    <div className={styles.step}>
                                        {step.description}
                                    </div>
                                    <div className={styles.step}>
                                        {positionMap[step.responsible] || '—'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Label>
                </div>
                <div className={styles.controlBlock}>
                    <Button
                        className={styles.controlButton}
                        onClick={() => {
                            navigate('/process')
                        }}
                    > Отмена </Button>
                    <Button
                        className={`${styles.controlButton} ${!isChanged || isLoading ? styles.disabled : ''}`}
                        onClick={onSaveClick}
                        disabled={!isChanged || isLoading}
                    > Сохранить </Button>
                </div>

            </div>

            <RegulationViewModal
                isOpen={isModalOpen}
                onClose={toggleModal}
                process={process}
                regulation={selectedRegulation!}
            />
        </div>
    );
};
