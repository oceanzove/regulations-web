import css from './RegulationList.module.scss';
import {closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import React, {useCallback} from "react";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {RegulationItem} from "./regulation-item";
import OptionIcon from "../../../../../shared/assets/images/option_icon.svg";
import {MainButton} from "../../../../../shared/ui/main-button/main-button.tsx";
import {regulationApi} from "../../../../../entities/regulation/api/api.ts";
import {IRegulation} from "../../../../../entities/regulation/api/types.ts";
import {notificationError, notificationSuccess} from "../../../../../widgets/notifications/callNotification.tsx";

interface IRegulationList {
    regulations: IRegulation[];
    updateRegulations: (regulations: IRegulation[]) => void;
    updateActiveRegulation: (id: string) => void;
}

export const RegulationList = (props: IRegulationList) => {
    const {
        regulations,
        updateRegulations,
        updateActiveRegulation,
    } = props;

    // Настройка сенсоров
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
    );

    // Обработка завершения перетаскивания
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = regulations.findIndex(regulation => regulation.id === active.id);
            const newIndex = regulations.findIndex(regulation => regulation.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                updateRegulations(arrayMove(regulations, oldIndex, newIndex));
            }
        }
    };


    const [createRegulation] = regulationApi.useCreateMutation();

    // Обработчик нажатия на кнопку "Создать"
    const onCreateClick = useCallback(async () => {
        try {
            // Вызываем мутацию для создания нового регламента
            const newRegulation = await createRegulation().unwrap();

            // Добавляем новый регламент в начало списка
            updateRegulations([newRegulation, ...regulations]);

            // Дополнительная логика, например, выделение только что созданного регламента
            updateActiveRegulation(newRegulation.id);

            notificationSuccess('Создание', 'Регламент успешно создан');
        } catch (error) {
            notificationError('Создание', 'Не удалось создать регламент');
            console.error("Error creating regulation:", error);
        }
    }, [createRegulation, regulations, updateRegulations, updateActiveRegulation]);

    return (
        <div className={css.wrapper}>
            <div className={css.header}>
                <img src={OptionIcon} alt="Option icon"/>
                <div>Регламенты</div>
                <MainButton
                    text={'Создать'}
                    onClick={onCreateClick}
                />
            </div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={regulations} strategy={verticalListSortingStrategy}>
                    <div className={css.competencies}>
                        {regulations.map((regulation, index) => (
                            <RegulationItem
                                key={regulation.id || index}
                                id={regulation.id}
                                title={regulation.title}
                                onClick={() => updateActiveRegulation(regulation.id)}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    )
};
