import {closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import React, {useCallback} from "react";
import OptionIcon from "../../../../../shared/assets/images/option_icon.svg";
import css from './StepList.module.scss';

interface IStepList {
    processes: IProcess[];
    updateProcesses: (processes: IProcess[]) => void;
    updateActiveProcess: (id: string) => void;
}

export const StepList = (props: IStepList) => {
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
            const oldIndex = processes.findIndex(process => process.id === active.id);
            const newIndex = processes.findIndex(process => process.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                updateProcesses(arrayMove(processes, oldIndex, newIndex));
            }
        }
    };


    const [createProcess] = processApi.useCreateMutation();

    // Обработчик нажатия на кнопку "Создать"
    const onCreateClick = useCallback(async () => {
        try {
            // Вызываем мутацию для создания нового регламента
            const newProcess = await createProcess().unwrap();

            // Добавляем новый регламент в начало списка
            updateProcesses([newProcess, ...processes]);

            // Дополнительная логика, например, выделение только что созданного регламента
            updateActiveProcess(newProcess.id);
            notificationSuccess('Создание', 'Процесс успешно создан');
        } catch (error) {
            notificationError('Создание', 'Не удалось создать процесс');
            console.error("Error creating regulation:", error);
        }
    }, [createProcess, processes, updateProcesses, updateActiveProcess]);

    return (
        <div className={css.wrapper}>
            <div className={css.header}>
                <img src={OptionIcon} alt="Option icon"/>
                <div>Процессы</div>
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
