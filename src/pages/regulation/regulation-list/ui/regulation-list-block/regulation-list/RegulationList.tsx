import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {IRegulation} from "../../../../../../entities/regulation/api/types.ts";
import styles from './RegulationList.module.scss';
import {Button} from "../../../../../../shared/ui/button";
import {IconEnum} from "../../../../../../shared/ui/icon/IconType.tsx";
import {Icon} from "../../../../../../shared/ui/icon";
import {RegulationCreateModal} from "../../../../../../widgets/modal/regulation-create";

interface IRegulationList {
    regulations: IRegulation[];
    updateRegulations: (regulations: IRegulation[]) => void;

    isModalOpen: boolean;
    toggleModal: () => void;
}

export const RegulationList = (props: IRegulationList) => {
    const {
        regulations,
        updateRegulations,
        isModalOpen,
        toggleModal,
    } = props;

    const navigate = useNavigate();

    // const [createProcess] = processApi.useCreateMutation();
    // const [createStep] = processApi.useCreateStepMutation();
    // const [linkRegulation] = processApi.useLinkRegulationMutation();
    //
    // // Обработчик нажатия на кнопку "Создать"
    // const onCreateClick = useCallback(async (
    //     process: IProcess,
    //     steps: IStep[],
    //     regulationIds: string[]
    // ) => {
    //     try {
    //         // 1. Создаём процесс
    //         await createProcess(process).unwrap();
    //
    //         // 2. Создаём шаги
    //         if (steps.length > 0) {
    //             await Promise.all(steps.map(step => {
    //                 createStep(step).unwrap()
    //             }))
    //         }
    //
    //         // 3. Связываем регламенты
    //         if (regulationIds.length > 0) {
    //             // Можно делать последовательно, если важен порядок, либо Promise.all
    //             await Promise.all(regulationIds.map(regulationId =>
    //                 linkRegulation({ processId: process.id, regulationId }).unwrap()
    //             ));
    //         }
    //
    //         // 4. Обновляем локальный список
    //         updateProcesses([process, ...processes]);
    //         notificationSuccess('Создание', 'Процесс успешно создан');
    //     } catch (error) {
    //         notificationError('Создание', 'Не удалось создать процесс');
    //         console.error("Error creating regulation:", error);
    //     }
    // }, [createProcess, createStep, linkRegulation, processes, updateProcesses]);


    const onCreateProcessClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        toggleModal();
        event.currentTarget.blur();
    };

    const onNavigateToRegulationClick = (id: string) => {
        navigate(`/regulation/${id}`);
    };

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    return (
        <div className={styles.regulationListWrapper}>
            <div className={styles.controls}>
                <Button
                    typeIcon={IconEnum.ADD}
                    className={styles.button}
                    onClick={onCreateProcessClick}
                >
                    Создать регламент
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
            <div className={styles.regulations}>
                <div className={styles.filter}>
                    <Button
                        typeIcon={IconEnum.FILTER}
                        className={styles.filterButton}
                    > Название </Button>
                    {/*<Button*/}
                    {/*    typeIcon={IconEnum.FILTER}*/}
                    {/*    className={styles.filterButton}*/}
                    {/*> Ответственный </Button>*/}
                    {/*<Button*/}
                    {/*    typeIcon={IconEnum.FILTER}*/}
                    {/*    className={styles.filterButton}*/}
                    {/*> Исполнитель </Button>*/}
                    {/*<Button*/}
                    {/*    typeIcon={IconEnum.FILTER}*/}
                    {/*    className={styles.filterButton}*/}
                    {/*> Сотрудники </Button>*/}
                </div>
                <div>
                    {regulations.map((regulation, index) => (
                        <div
                            key={index}
                            className={styles.regulation}
                            onClick={() => onNavigateToRegulationClick(regulation.id)}
                        >
                            {regulation.title}
                        </div>
                    ))}
                </div>
            </div>

            <RegulationCreateModal
                // isOpen={isModalOpen}
                // onClose={toggleModal}
                // regulations={regulations}
                // onProcessCreate={onCreateClick}
            />
        </div>
    )
};
