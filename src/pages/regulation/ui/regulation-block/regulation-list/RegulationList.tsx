import styles from './RegulationList.module.scss';
import {Button} from "../../../../../shared/ui/button";
import {IconEnum} from "../../../../../shared/ui/icon/IconType.tsx";
import React, {FC, useCallback, useEffect, useState} from "react";
import {Icon} from "../../../../../shared/ui/icon";
import {IRegulation} from "../../../../../entities/regulation/api/types.ts";
import {regulationApi} from "../../../../../entities/regulation/api/api.ts";
import {notificationError, notificationSuccess} from "../../../../../widgets/notifications/callNotification.tsx";

type TRegulationListProps = {
    regulations: IRegulation[]
    onSelectRegulation: (id: string) => void;
    updateRegulation: (regulation: IRegulation[]) => void;

    isModalOpen: boolean;
    toggleModal: () => void;
};

export const RegulationList: FC<TRegulationListProps> = (props) => {
    const {
        regulations,
        updateRegulation,
        onSelectRegulation,

        isModalOpen,
        toggleModal,
    } = props;

    const [ createRegulation ] = regulationApi.useCreateMutation();

    // Обработчик нажатия на кнопку "Создать"
    const onCreateClick = useCallback(async (regulation: IRegulation) => {
        try {
            // Вызываем мутацию для создания нового регламента
            await createRegulation(regulation).unwrap();

            // Добавляем новый регламент в начало списка
            updateRegulation([regulation, ...regulations]);

            notificationSuccess('Создание', 'Регламент успешно создан');
        } catch (error) {
            notificationError('Создание', 'Не удалось создать регламент');
            console.error("Error creating regulation:", error);
        }
    }, [createRegulation, regulations, updateRegulation]);

    const onCreateRegulationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        <div className={styles.regulationListWrapper}>
            <div className={styles.controls}>
                <Button
                    typeIcon={IconEnum.ADD}
                    className={styles.button}
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
                <div className={styles.regulationItems}>
                    { regulations.map((regulation, index) => (
                        <div
                            key={index}
                            className={styles.regulation}
                            onClick={() => onSelectRegulation(regulation.id)}
                        >
                            {regulation.title}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};