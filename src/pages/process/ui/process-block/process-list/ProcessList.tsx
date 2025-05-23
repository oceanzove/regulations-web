import {IProcess} from "../../../../../entities/process/api/types.ts";
import styles from './ProcessList.module.scss';
import {Button} from "../../../../../shared/ui/button";
import {Icon} from "../../../../../shared/ui/icon";
import {IconEnum} from "../../../../../shared/ui/icon/IconType.tsx";
import React, {useCallback, useEffect} from "react";
import {ProcessCreateModal} from "../../../../../widgets/modal/process-create";
import {notificationError, notificationSuccess} from "../../../../../widgets/notifications/callNotification.tsx";
import {processApi} from "../../../../../entities/process/api/api.ts";
import {stepApi} from "../../../../../entities/step/api/api.ts";
import {IStep} from "../../../../../entities/step/api/types.ts";

interface IProcessList {
    processes: IProcess[];
    updateProcesses: (processes: IProcess[]) => void;
    updateActiveProcess: (id: string) => void;

    isModalOpen: boolean;
    toggleModal: () => void;
}

export const ProcessList = (props: IProcessList) => {
    const {
        processes,
        updateProcesses,
        updateActiveProcess,
        isModalOpen,
        toggleModal,
    } = props;


    const [createProcess] = processApi.useCreateMutation();
    const [createSteps] = stepApi.useCreateStepsMutation();

    // Обработчик нажатия на кнопку "Создать"
    const onCreateClick = useCallback(async (process: IProcess, steps: IStep[]) => {
        try {
            // Вызываем мутацию для создания нового регламента
            await createProcess(process).unwrap();

            await createSteps(steps).unwrap();

            // Добавляем новый регламент в начало списка
            updateProcesses([process, ...processes]);

            notificationSuccess('Создание', 'Процесс успешно создан');
        } catch (error) {
            notificationError('Создание', 'Не удалось создать процесс');
            console.error("Error creating regulation:", error);
        }
    }, [createProcess, processes, updateProcesses, updateActiveProcess]);


    const onCreateProcessClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        toggleModal();
        event.currentTarget.blur();
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
                            // onClick={() => onCreateProcessClick()}
                        >
                            {process.title}
                        </div>
                    ))}
                </div>
            </div>

            <ProcessCreateModal
                isOpen={isModalOpen}
                onClose={toggleModal}
                onProcessCreate={onCreateClick}
                // onSelect={handleCompetenciesSelect}
                // selectedCompetencies={competencies}
                // competencyNames={competencyNames}
            />
        </div>
    )
};
