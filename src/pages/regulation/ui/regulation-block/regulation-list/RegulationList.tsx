import css from './RegulationList.module.scss';
import {closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import React from "react";
import {IRegulation} from "../../../../../entities/regulation/model/slices/regulationSlice.ts";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {RegulationItem} from "./regulation-item";
import OptionIcon from "../../../../../shared/assets/images/option_icon.svg";
import {MainButton} from "../../../../../shared/ui/button/button.tsx";

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

    return (
        <div className={css.wrapper}>
            <div className={css.header}>
                <img src={OptionIcon} alt="Option icon"/>
                <div>Регламенты</div>
                <MainButton
                    text={'Создать'}
                />
            </div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={regulations} strategy={verticalListSortingStrategy}>
                    <div className={css.competencies}>
                        {regulations.map((regulation) => (
                            <RegulationItem
                                key={regulation.id}
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