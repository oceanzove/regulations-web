import {IProcess} from "../../../../../../../../../entities/process/api/types.ts";
import styles from './ProcessList.module.scss';
import {Button} from "../../../../../../../../../shared/ui/button";
import {Icon} from "../../../../../../../../../shared/ui/icon";
import {IconEnum} from "../../../../../../../../../shared/ui/icon/IconType.tsx";
import React, {useCallback, useEffect} from "react";
import {ProcessCreateModal} from "../../../../../../../../../widgets/modal/process-create";
import {notificationError, notificationSuccess} from "../../../../../../../../../widgets/notifications/callNotification.tsx";
import {processApi} from "../../../../../../../../../entities/process/api/api.ts";
import {stepApi} from "../../../../../../../../../entities/step/api/api.ts";
import {IStep} from "../../../../../../../../../entities/step/api/types.ts";
import {useNavigate} from "react-router-dom";
import {IRegulation} from "../../../../../../../../../entities/regulation/api/types.ts";

interface IProcessList {
    processes: IProcess[];
    regulations: IRegulation[];
    updateProcesses: (processes: IProcess[]) => void;

    isModalOpen: boolean;
    toggleModal: () => void;
}

export const ProcessList = (props: IProcessList) => {
    const {
        processes,
        regulations,
        updateProcesses,
        isModalOpen,
        toggleModal,
    } = props;

    const navigate = useNavigate();

    const [createProcess] = processApi.useCreateMutation();
    const [createStep] = processApi.useCreateStepMutation();
    const [linkRegulation] = processApi.useLinkRegulationMutation();

    // Обработчик нажатия на кнопку "Создать"
    const onCreateClick = useCallback(async (
        process: IProcess,
        steps: IStep[],
        regulationIds: string[]
    ) => {
        try {
            // 1. Создаём процесс
            await createProcess(process).unwrap();

            // 2. Создаём шаги
            if (steps.length > 0) {
                await Promise.all(steps.map(step => {
                    createStep(step).unwrap()
                }))
            }

            // 3. Связываем регламенты
            if (regulationIds.length > 0) {
                // Можно делать последовательно, если важен порядок, либо Promise.all
                await Promise.all(regulationIds.map(regulationId =>
                    linkRegulation({ processId: process.id, regulationId }).unwrap()
                ));
            }

            // 4. Обновляем локальный список
            updateProcesses([process, ...processes]);
            notificationSuccess('Создание', 'Процесс успешно создан');
        } catch (error) {
            notificationError('Создание', 'Не удалось создать процесс');
            console.error("Error creating regulation:", error);
        }
    }, [createProcess, createStep, linkRegulation, processes, updateProcesses]);


    const onCreateProcessClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        toggleModal();
        event.currentTarget.blur();
    };

    const onNavigateToProcessClick = (id: string) => {
        navigate(`/process/${id}`);
    };

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    return (
        <div className={styles.processListWrapper}>
            <div className={styles.controls}>
                <Button
                    typeIcon={IconEnum.ADD}
                    className={styles.button}
                    onClick={onCreateProcessClick}
                >
                    Создать процесс
                </Button>
                <div className={styles.search}>
                    <Icon
                        className={styles.iconContainer}
                        type={IconEnum.SEARCH}
                    />
                    <textarea
                        className={styles.searchArea}
                        placeholder={'Поиск'}
                        // value={value}
                        // onChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles.processes}>
                <div className={styles.filter}>
                    <Button
                        typeIcon={IconEnum.FILTER}
                        className={styles.filterButton}
                    > Название </Button>
                    <Button
                        typeIcon={IconEnum.FILTER}
                        className={styles.filterButton}
                    > Ответственный </Button>
                    <Button
                        typeIcon={IconEnum.FILTER}
                        className={styles.filterButton}
                    > Исполнитель </Button>
                    <Button
                        typeIcon={IconEnum.FILTER}
                        className={styles.filterButton}
                    > Сотрудники </Button>
                </div>
                <div className={styles.processItems}>
                    {processes.map((process, index) => (
                        <div
                            key={index}
                            className={styles.process}
                            onClick={() => onNavigateToProcessClick(process.id)}
                        >
                            {process.title}
                        </div>
                    ))}
                </div>
            </div>

            <ProcessCreateModal
                isOpen={isModalOpen}
                onClose={toggleModal}
                regulations={regulations}
                onProcessCreate={onCreateClick}
            />
        </div>
    )
};
