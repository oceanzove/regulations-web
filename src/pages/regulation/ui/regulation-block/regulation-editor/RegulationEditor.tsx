import {IRegulation} from "../../../../../entities/regulation/api/types.ts";
import {IDropdownMenuProps} from "../../../../../widgets/dropdown-menu/types.ts";
import { FC } from "react";
import styles from './RegulationEditor.module.scss';
import {Sections} from "./sections";
import {DraftEditor} from "./editor";

type TRegulationEditorProps = {
    onSelectRegulation: (id: string | null) => void;
}

export const RegulationEditor: FC<TRegulationEditorProps> = (props) => {

    const { onSelectRegulation } = props;

    const block: IDropdownMenuProps = {
        blocks: [
            {
                title: "Регламент",
                sections: [
                    {
                        title: "Общие положения",
                        items: [
                            { label: "Настоящий регламент", checked: true },
                            { label: "Для достижения общего уровня", checked: false },
                            { label: "Документ определяющий всю вашу дальнеюшую жизнь", checked: false },
                        ],
                    },
                    {
                        title: "Область применения",
                        items: [],
                    },
                    {
                        title: "Описание процессов",
                        items: [],
                    },
                ],
            },
            {
                title: "Положение подразделений",
                sections: [
                    {
                        title: "Общие положения",
                        items: [
                            { label: "Настоящий регламент", checked: true },
                            { label: "Для достижения общего уровня", checked: false },
                            { label: "Документ определяющий всю вашу дальнеюшую жизнь", checked: false },
                        ],
                    },
                    {
                        title: "Область применения",
                        items: [],
                    },
                    {
                        title: "Описание процессов",
                        items: [],
                    },
                ],
            },
        ]
    };



    // useEffect(() => {
    //     updateRegulation(regulations);
    // }, []);
    const testRegulation: IRegulation = { id: '1', title: 'ЗУБЫ', content: 'dsfsdf'}



    // console.log(activeRegulation);
    return (
        <div className={styles.wrapper}>
            <Sections
                regulations={block}
                onSelectRegulation={(regulationId) => onSelectRegulation(regulationId)}
            />
            <DraftEditor
                activeRegulation={testRegulation}
                // updateContent={updateContent}
                // updateTitle={updateTitle}
            />
            {/*<Sections*/}
            {/*    regulations={regulationState.regulations}*/}
            {/*    updateRegulations={updateRegulation}*/}
            {/*    updateActiveRegulation={updateActiveRegulation}*/}
            {/*/>*/}
            {/*{activeRegulation ? (*/}
            {/*    <RegulationEditor*/}
            {/*        activeRegulation={activeRegulation}*/}
            {/*        updateContent={updateContent}*/}
            {/*        updateTitle={updateTitle}*/}
            {/*    />*/}
            {/*) : (*/}
            {/*    <div className={css.placeholder}>*/}
            {/*        Выберите или создайте регламент для редактирования*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    )
};