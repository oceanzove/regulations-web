import styles from './Sections.module.scss';
import React from "react";
import {MainButton} from "../../../../../../shared/ui/main-button/main-button.tsx";
import {SearchIcon} from "../../../../../../shared/assets/icons";
import css from "../../../../../../shared/ui/text-area/textArea.module.scss";
import {DropdownMenu} from "../../../../../../widgets/dropdown-menu/ui";
import {IDropdownMenuProps} from "../../../../../../widgets/dropdown-menu/types.ts";
import {Button} from "../../../../../../shared/ui/button";

interface IRegulationList {
    regulations: IDropdownMenuProps;
    // updateRegulations: (regulations: IRegulation[]) => void;
    onSelectRegulation: (id: string | null) => void;
}

export const Sections = (props: IRegulationList) => {
    const {
        regulations,
        // updateRegulations,
        onSelectRegulation,
    } = props;

    // // Настройка сенсоров
    // const sensors = useSensors(
    //     useSensor(PointerSensor, {
    //         activationConstraint: {
    //             distance: 5,
    //         },
    //     }),
    // );
    //
    // // Обработка завершения перетаскивания
    // const handleDragEnd = (event: DragEndEvent) => {
    //     const { active, over } = event;
    //     if (over && active.id !== over.id) {
    //         const oldIndex = regulations.findIndex(regulation => regulation.id === active.id);
    //         const newIndex = regulations.findIndex(regulation => regulation.id === over.id);
    //
    //         if (oldIndex !== -1 && newIndex !== -1) {
    //             updateRegulations(arrayMove(regulations, oldIndex, newIndex));
    //         }
    //     }
    // };


    // const [createRegulation] = regulationApi.useCreateMutation();

    // // Обработчик нажатия на кнопку "Создать"
    // const onCreateClick = useCallback(async () => {
    //     try {
    //         // Вызываем мутацию для создания нового регламента
    //         const newRegulation = await createRegulation().unwrap();
    //
    //         // Добавляем новый регламент в начало списка
    //         updateRegulations([newRegulation, ...regulations]);
    //
    //         // Дополнительная логика, например, выделение только что созданного регламента
    //         updateActiveRegulation(newRegulation.id);
    //
    //         notificationSuccess('Создание', 'Регламент успешно создан');
    //     } catch (error) {
    //         notificationError('Создание', 'Не удалось создать регламент');
    //         console.error("Error creating regulation:", error);
    //     }
    // }, [createRegulation, regulations, updateRegulations, updateActiveRegulation]);

    return (
        <div className={styles.regulationSectionWrapper}>
            <div className={styles.header}>
                <div>Подберите шаблоны, разделы и модули</div>
            </div>
            <div className={styles.search}>
                <SearchIcon
                    width={17.4}
                    height={17.4}
                />
                <div className={css.inputContainer}>
                <textarea
                    style={{height: 24}}
                    className={styles.searchArea}
                    placeholder={'Поиск'}
                    // value={value}
                    // onChange={handleChange}
                />
                </div>
            </div>
            <div className={styles.sections}>
                {/*// TODO помечать секцию в которых что-то выбрано*/}
                {/*// TODO добавить скролл бар*/}
                <DropdownMenu
                    blocks={regulations.blocks}
                />

                {/*{regulations.map((regulation, index) => (*/}
                {/*    <RegulationItem*/}
                {/*        key={regulation.id || index}*/}
                {/*        id={regulation.id}*/}
                {/*        title={regulation.title}*/}
                {/*        onClick={() => updateActiveRegulation(regulation.id)}*/}
                {/*    />*/}
                {/*))}*/}
            </div>
            <MainButton
                text={'Создать'}
                onClick={() => {}}
            />
            <Button
                onClick={() => {onSelectRegulation(null)}}
            >
                Назад
            </Button>
        </div>
    )
};