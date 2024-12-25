import css from './ProcessList.module.scss';
import {closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import React from "react";
import OptionIcon from "../../../../../shared/assets/images/option_icon.svg";
import {MainButton} from "../../../../../shared/ui/button/button.tsx";
import {RegulationItem} from "../../../../regulation/ui/regulation-block/regulation-list/regulation-item";
import {IProcess} from "../../../../../entities/process/api/types.ts";

interface IProcessList {
    processes: IProcess[];
    updateProcesses: (processes: IProcess[]) => void;
    updateActiveProcess: (id: string) => void;
}

export const ProcessList = (props: IProcessList) => {
    const {
        processes,
        updateProcesses,
        updateActiveProcess,
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
            const oldIndex = processes.findIndex(regulation => regulation.id === active.id);
            const newIndex = processes.findIndex(regulation => regulation.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                updateProcesses(arrayMove(processes, oldIndex, newIndex));
            }
        }
    };


    // const [createRegulation] = processApi.useCreateMutation();
    //
    // // Обработчик нажатия на кнопку "Создать"
    // const onCreateClick = useCallback(async () => {
    //     try {
    //         // Вызываем мутацию для создания нового регламента
    //         const newRegulation = await createRegulation().unwrap();
    //
    //         // Добавляем новый регламент в начало списка
    //         updateProcesses([newRegulation, ...regulations]);
    //
    //         // Дополнительная логика, например, выделение только что созданного регламента
    //         updateActiveProcess(newRegulation.id);
    //     } catch (error) {
    //         console.error("Error creating regulation:", error);
    //     }
    // }, [createRegulation, regulations, updateProcesses, updateActiveProcess]);

    return (
        <div className={css.wrapper}>
            <div className={css.header}>
                <img src={OptionIcon} alt="Option icon"/>
                <div>Регламенты</div>
                <MainButton
                    text={'Создать'}
                    onClick={() => {}}
                />
            </div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={processes} strategy={verticalListSortingStrategy}>
                    <div className={css.competencies}>
                        {processes.map((process, index) => (
                            <RegulationItem
                                key={process.id || index}
                                id={process.id}
                                title={process.title}
                                onClick={() => updateActiveProcess(process.id)}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    )
};