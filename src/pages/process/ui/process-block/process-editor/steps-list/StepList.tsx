import {closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import React from "react";
import OptionIcon from "../../../../../../shared/assets/images/option_icon.svg";
import css from './StepList.module.scss';
import {IStep} from "../../../../../../entities/process/api/types.ts";
import {StepItem} from "./step-item";
import {MainButton} from "../../../../../../shared/ui/main-button/main-button.tsx";

interface IStepList {
    steps: IStep[];
    updateSteps: (steps: IStep[]) => void;
    // updateActiveProcessProcess: (id: string) => void;
}

export const StepList = (props: IStepList) => {
    const {
        steps,
        updateSteps,
        // updateActiveProcess,
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
            const oldIndex = steps.findIndex(step => step.id === active.id);
            const newIndex = steps.findIndex(step => step.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                updateSteps(arrayMove(steps, oldIndex, newIndex));
            }
        }
    };


    // const [createProcess] = processApi.useCreateMutation();
    //
    // // Обработчик нажатия на кнопку "Создать"
    // const onCreateClick = useCallback(async () => {
    //     try {
    //         // Вызываем мутацию для создания нового регламента
    //         const newProcess = await createProcess().unwrap();
    //
    //         // Добавляем новый регламент в начало списка
    //         updateProcesses([newProcess, ...processes]);
    //
    //         // Дополнительная логика, например, выделение только что созданного регламента
    //         updateActiveProcess(newProcess.id);
    //         notificationSuccess('Создание', 'Процесс успешно создан');
    //     } catch (error) {
    //         notificationError('Создание', 'Не удалось создать процесс');
    //         console.error("Error creating regulation:", error);
    //     }
    // }, [createProcess, processes, updateProcesses, updateActiveProcess]);

    return (
        <div className={css.wrapper}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={steps} strategy={verticalListSortingStrategy}>
                    <div className={css.competencies}>
                        {steps.map((step, index) => (
                            <StepItem
                                key={step.id || index}
                                id={step.id}
                                title={step.description}
                                description={step.description}
                                onClick={() => {}}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
            <div className={css.header}>
                <img src={OptionIcon} alt="Option icon"/>
                <div>Процессы</div>
                <MainButton
                    text={'Создать'}
                    onClick={() => {
                    }}
                />
            </div>
        </div>
    )
};
