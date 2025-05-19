import css from './RegulationBlock.module.scss';
import {RegulationList} from "./regulation-list";
import {RegulationEditor} from "./regulation-editor";
import {useRegulation} from "../../../../entities/regulation/model/hooks/useRegulation.ts";
import {regulationApi} from "../../../../entities/regulation/api/api.ts";
import {useEffect, useState} from "react";
import {IRegulation} from "../../../../entities/regulation/api/types.ts";

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

    const activeRegulation = regulationState.regulations.find(
        (reg) => reg.id === regulationState.activeRegulation
    );
    // console.log(regulationState.regulations)

    // const regulations: IRegulation[] = [
    //     { id: '1', title: 'ЗУБЫ', content: 'dsfsdf'},
    //     { id: '2', title: 'ГУБЫ', content: 'dsfsdf'},
    //     { id: '3', title: 'ТУФЛЯ', content: 'dsfsdf'},
    // ]

    return (
        <div className={css.regulationBlockWrapper}>
            {   activeRegulation
                ?
                <RegulationList
                    regulations={regulationState.regulations}
                    onSelectRegulation={(regulationId) => updateActiveRegulation(regulationId)}
                />
                :
                <RegulationEditor/>
            }
        </div>
    )
};