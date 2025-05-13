import css from './RegulationBlock.module.scss';
import {Sections} from "./regulation-editor/sections";
import {useRegulation} from "../../../../entities/regulation/model/hooks/useRegulation.ts";
import {Editor} from "./regulation-editor/editor";
import {useEffect, useState} from "react";
import {regulationApi} from "../../../../entities/regulation/api/api.ts";
import {IRegulation} from "../../../../entities/regulation/api/types.ts";
import { IDropdownMenuProps} from "../../../../widgets/dropdown-menu/types.ts";

export const RegulationBlock = () => {
    const {
        regulationState,
        updateRegulation,
        updateContent,
        updateTitle,
        updateActiveRegulation,
    } = useRegulation()

    const { data } = regulationApi.useGetQuery();
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        if (data && !isDataLoaded) {
            updateRegulation(data.regulations);
            setIsDataLoaded(true);
        }
    }, [data, isDataLoaded, updateRegulation]);

    // const activeRegulation = regulationState.regulations.find(
    //     (reg) => reg.id === regulationState.activeRegulation
    // );
    // console.log(regulationState.regulations)

    const regulations: IRegulation[] = [
        { id: '1', title: 'ЗУБЫ', content: 'dsfsdf'},
        { id: '2', title: 'ГУБЫ', content: 'dsfsdf'},
        { id: '3', title: 'ТУФЛЯ', content: 'dsfsdf'},
    ]

    const activeRegulation = regulations.find(
        (reg) => reg.id === '2'
    );

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

    console.log(activeRegulation);
    return (
        <div className={css.wrapper}>
            { activeRegulation
                ?
                <>

                </>
                :
                <>
                    <Sections
                        regulations={block}
                        updateRegulations={updateRegulation}
                        updateActiveRegulation={updateActiveRegulation}
                    />
                    <Editor
                        activeRegulation={testRegulation}
                        updateContent={updateContent}
                        updateTitle={updateTitle}
                    />
                </>

            }
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