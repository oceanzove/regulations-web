import {useNavigate} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import {IRegulation, ISection} from "../../../../../../entities/regulation/api/types.ts";
import styles from './RegulationList.module.scss';
import {Button} from "../../../../../../shared/ui/button";
import {IconEnum} from "../../../../../../shared/ui/icon/IconType.tsx";
import {Icon} from "../../../../../../shared/ui/icon";
import {RegulationCreateModal} from "../../../../../../widgets/modal/regulation-create";
import {IProcess} from "../../../../../../entities/process/api/types.ts";
import {IStep} from "../../../../../../entities/step/api/types.ts";
import {notificationError, notificationSuccess} from "../../../../../../widgets/notifications/callNotification.tsx";
import {regulationApi} from "../../../../../../entities/regulation/api/api.ts";

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

    const [ sections, setSections ] = useState<ISection[]>([])

    const [ createRegulation ] = regulationApi.useCreateMutation();

    const handleRegulationCreate = useCallback(async (
        regulation: IRegulation,
    ) => {
        try {
            await createRegulation(regulation);

            updateRegulations([regulation, ...regulations]);
            notificationSuccess('Создание', 'Регламент успешно создан');
        } catch (error) {
            notificationError('Создание', 'Не удалось создать регламент');
            console.error("Error creating regulation:", error);
        }
    }, [createRegulation, regulations, updateRegulations]);

    const [ createSection ] = regulationApi.useCreateSectionMutation();

    const handleSectionCreate = useCallback(async (
        section: ISection,
    ) => {
        try {
            await createSection(section);

            notificationSuccess('Создание', 'Секция успешно создан');
        } catch (error) {
            notificationError('Создание', 'Не удалось создать секцию');
            console.error("Error creating regulation:", error);
        }
    }, [createSection]);

    const { data: sectionData } = regulationApi.useGetSectionQuery();

    useEffect(() => {
        if (sectionData) {
            if (sectionData.sections !== null) {
                setSections(sectionData.sections);
            }
        }
    }, [sectionData]);

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
                isOpen={isModalOpen}
                onClose={toggleModal}
                sections={sections}
                onSectionCreate={handleSectionCreate}
                onRegulationCreate={handleRegulationCreate}
            />
        </div>
    )
};
